<?php

require_once 'paginate.php';

class siquery{

    public $debug       = false;

    public $pageVar     = 'page';
    public $searchVar   = 'search';
    public $allowVar    = [];

    private $affected   = null;
    private $primaryKey = null;
    private $select     = null;
    private $distinct   = null;
    private $from       = null;
    private $where      = null;
    private $groupBy    = null;
    private $orderBy    = null;
    private $search     = null;
    private $limit      = null;
    private $offset     = null;
    private $join       = null;
    private $innerJoin  = [];
    private $rightJoin  = [];
    private $leftJoin   = [];
    private $queryStr   = null;
    private $error      = [];
    private $fetch      = null;
    private $raw        = null;
    private $dml        = false;

    public function __construct($config = null){

        if($config == null){
            $engine     = 'mysql';
            $host       = 'localhost';
            $database   = 'react';
            $username   = 'root';
            $password   = '';
        } else {
            $engine     = $config['engine'];
            $host       = $config['host'];
            $database   = $config['database'];
            $username   = $config['username'];
            $password   = $config['password'];
        }

        try{

            $this->DBH  = new PDO("{$engine}:host={$host};dbname={$database}", $username, $password);

        } catch(PDOException $e) {

            die($e->getMessage());

        }
    }

    private function resetQuery(){
        $this->select     = null;
        $this->distinct   = null;
        $this->from       = null;
        $this->where      = null;
        $this->groupBy    = null;
        $this->orderBy    = null;
        $this->search     = null;
        $this->limit      = null;
        $this->offset     = null;
        $this->join       = null;
        $this->innerJoin  = [];
        $this->rightJoin  = [];
        $this->leftJoin   = [];
        $this->queryStr   = null;
        $this->fetch      = null;
        $this->raw        = null;
        $this->dml        = false;
    }

    public function buildQuery(){
        $this->queryStr = null;
        if($this->dml !== false){
            die($this->dml." statement wouldn't working until SELECT statement done");
        }

        if(!empty($this->select)){
            $this->queryStr .= 'SELECT '.$this->distinct.$this->select;
        }

        if(!empty($this->from)){
            if(empty($this->select)){
                $this->queryStr .= 'SELECT '.$this->distinct.'* ';
            }
            $this->queryStr .= ' FROM '.$this->from;
        }

        if(!empty($this->join)){
            $this->queryStr .= $this->join;
        }

        if(!empty($this->search)){
            if(!empty($this->where)){
                $this->queryStr .= ' WHERE '. $this->search . ' AND '. $this->where;
            } else {
                $this->queryStr .= ' WHERE '. $this->search;
            }
        }

        if(!empty($this->where) && empty($this->search)){
            $this->queryStr .= ' WHERE '. $this->where;
        }

        if(!empty($this->groupBy)){
            $this->queryStr .= ' GROUP BY '. $this->groupBy;
        }

        if(!empty($this->having)){
            $this->queryStr .= ' HAVING '. $this->having;
        }

        if(!empty($this->orderBy)){
            $this->queryStr .= ' ORDER BY '. $this->orderBy;
        }

        if(!empty($this->limit)){
            $this->queryStr .= ' LIMIT '. $this->limit;
        }

        if(!empty($this->offset)){
            $this->queryStr .= ' OFFSET '. $this->offset;
        }

        if(!empty($this->raw)){
            $this->queryStr = $this->raw;
        }

        return $this->queryStr;

    }

    public function TRANSACTION(){
        $this->DBH->beginTransaction();
    }

    public function COMMIT(){
        $this->DBH->commit();
    }

    public function ROLLBACK(){
        $this->DBH->rollback();
    }

    public function search($fields, $operator = 'OR'){
        $key = isset($_GET[$this->searchVar]) ? $_GET[$this->searchVar] : null;
        $fields = explode(',', $fields);
        if($key !== null){
            $search = $key;
            foreach ($fields as $field) {
                $searchArr[] = " {$field} like '%{$search}%' ";
            }
            $this->search = '('.implode($operator, $searchArr).')';
        } else {
            $this->search= null;
        }

        return $this;
    }

    //Query
    public function from($table){
        $this->from = $table;
        return $this;
    }

    public function select($field){
        $this->select = $field;
        return $this;
    }

    public function distinct(){
        $this->distinct = 'DISTINCT ';
        return $this;
    }

    public function where($where, $key = false){

        if($key!=false){

            if(is_int($key)){
                $this->where = $where.' = '.$key;
            } else {
                $this->where = $where." = '".$key."'";
            }

        } else {
            $this->where = $where;
        }

        return $this;

    }

    public function groupBy($group){
        $this->groupBy = $group;
        return $this;
    }

    public function raw($query){
        $this->raw = $query;
        return $this;
    }

    public function orderBy($field, $a = false){

        if($a == false){
            $this->orderBy = $field;
        } else {
            $this->groupBy = $group.' '.$a;
        }

        return $this;

    }

    public function having($field){
        $this->having = $field;
        return $this;
    }

    public function limit($int){
        $this->limit = $int;
        if(!empty($this->offset)){
            if(preg_match('/\,/', $this->offset)){
                die('invalid limit, offset already setup with limit');
            }
        }
        return $this;
    }

    public function offset($a, $b = false){
        if($b == false){
            $this->offset = $a;
        } else {
            if(!empty($this->limit)){
                die('invalid offset, limit already setup');
            }
            $this->offset = $a.','.$b;
        }
        return $this;
    }

    public function innerJoin($table, $using = false, $on = false){
        $this->innerJoin[] = $table;
        $this->join .= ' INNER JOIN '.$table;
        $this->join($using, $on);
        return $this;
    }

    public function leftJoin($table, $using = false, $on = false){
        $this->leftJoin[] = $table;
        $this->join .= ' LEFT JOIN '.$table;
        $this->join($using, $on);
        return $this;
    }

    public function rightJoin($table, $using = false, $on = false){
        $this->rightJoin[] = $table;
        $this->join .= ' RIGHT JOIN '.$table;
        $this->join($using, $on);
        return $this;
    }

    private function join($using, $on){
        if($using != false && $on ==false){
            $this->join .= ' USING('.$using.')';
        }
        if($using != false && $on != false){
            $this->join .= ' ON '.$using.' = '.$on;
        }
    }

    //Retrieve 1 field
    public function fetch($column){
        $this->fetch = $column;
        $this->select = $column;

        $SQL = $this->DBH->prepare($this->buildQuery());
        $SQL->execute();

        $result = $SQL->fetch(PDO::FETCH_OBJ);

        if($SQL->errorInfo()[2] !== null && $this->debug == true){
            die($SQL->errorInfo()[2]);
        }

        $this->resetQuery();

        if(isset($result->$column)){
            return $result->$column;
        }

        $this->error[] = $SQL->errorInfo()[2];
        return false;
    }

    public function paginate($limit, $params = []){

        $mode = isset($params['mode']) ? $params['mode'] : 'object';
        $this->allowVar  = isset($params['allowVar']) ? is_array($params['allowVar']) ? $params['allowVar'] : array() : array();
        $this->searchVar = isset($params['searchVar']) ? $params['searchVar'] : $this->searchVar;
        $this->pageVar   = isset($params['pageVar']) ? $params['pageVar'] : $this->pageVar;

        $page = isset($_GET[$this->pageVar]) ? $_GET[$this->pageVar] : 1;
        if(!empty($this->limit) || !empty($this->offset)){
            die('Limit or offset statement already setup');
        }

        $this->totalData = $this->totalRow($this->buildQuery());

        $this->limit = $limit;
        $this->offset= ($page - 1) * $limit;
        $this->limitPage = $limit;

        return $this->get($mode);
    }

    private function totalRow($query){
        $query = explode('FROM', $query);
        $query = 'SELECT COUNT(*) FROM '.$query[1];
        $SQL = $this->DBH->prepare($query);
        $SQL->execute();
        $result = $SQL->fetchColumn();
        if($result == false){
            $result = 0;
        }
        return (int) $result;
    }

    public function rowCount($col = '*'){
        $query = explode('FROM', $this->buildQuery());
        $query = "SELECT COUNT({$col}) FROM ".$query[1];
        $SQL = $this->DBH->prepare($query);
        $SQL->execute();
        $result = $SQL->fetchColumn();
        if($result == false){
            $result = 0;
        }
        $this->resetQuery();
        return (int) $result;
    }

    //Retrieve Rows
    public function get($mode = 'object'){
        $SQL = $this->DBH->prepare($this->buildQuery());
        $SQL->execute();

        if($mode == 'array'){
            $mode = PDO::FETCH_ASSOC;
        } else {
            $mode = PDO::FETCH_OBJ;
        }

        while($row = $SQL->fetch($mode)){
            $result[] = $row;
        }

        if($SQL->errorInfo()[2] !== null && $this->debug == true){
            die($SQL->errorInfo()[2]);
        }

        $this->resetQuery();

        if(isset($result)){
            return $result;
        }

        $this->error[] = $SQL->errorInfo()[2];
        return false;
    }

    //Retrieve 1 Rows
    public function first($mode = 'object'){
        $SQL = $this->DBH->prepare($this->buildQuery());
        $SQL->execute();

        if($mode == 'array'){
            $mode = PDO::FETCH_ASSOC;
        } else {
            $mode = PDO::FETCH_OBJ;
        }
        $row = $SQL->fetch($mode);

        $this->resetQuery();

        return $row;
    }

    //---------------------------
    //
    // DATA MANIPULATION LANGUAGE
    //
    //---------------------------

    public function insert($table, $data){
        $this->dml = 'INSERT';

        foreach ($data as $key){
            $value[]= "'".addslashes($key)."'";
        }

        $field = implode(',',array_keys($data));
        $value = implode(',',$value);
        $this->exec = "INSERT INTO $table($field) values($value)";
        return $this;

    }

    public function lastId(){
        return $this->DBH->lastInsertId();
    }

    public function update($table, $data, $where = null){
        $this->dml = 'UPDATE';

        foreach ($data as $key => $value) {
            $val[] = $key."='".addslashes($value)."'";
        }

        $value = implode(",",$val);
        $this->exec = "UPDATE {$table} SET {$value}";

        if($where !== null){
            $this->where = $where;
        }

        return $this;
    }

    public function delete($table, $where = null){
        $this->dml = 'DELETE';
        if($where !== null){
            $this->where = $where;
        }

        $this->exec = "DELETE FROM $table";
        return $this;
    }

    public function execute(){
        $this->affected = 0;
        if(!empty($this->from) || !empty($this->raw)){
            die("Can't execute query until SELECT statement done");
        }

        if($this->dml == 'UPDATE'){
            if($this->where == null){
                die("Can't execute UPDATE statement without WHERE clause");
            }else{
                $this->exec .= ' WHERE '.$this->where;
            }
        }

        if($this->dml == 'DELETE'){
            if($this->where == null){
                die("Can't execute DELETE statement without WHERE clause");
            }else{
                $this->exec .= ' WHERE '.$this->where;
            }
        }

        $SQL = $this->DBH->prepare((string)$this->exec);
        $this->resetQuery();

        if($SQL->execute()){
            $this->affected = $SQL->rowCount();
            return true;
        };

        if($SQL->errorInfo()[2] !== null && $this->debug == true){
            die($SQL->errorInfo()[2]);
        }

        $this->error[] = $SQL->errorInfo()[2];

        return false;
    }

    public function affected(){
        return $this->affected;
    }

    public function getError(){
        return $this->error;
    }

    //UTILS
    public function getPagenav($advance =false){

        $paginate = new paginate($advance);
        return $paginate->generateHTML($this->totalData,
                                    $this->limitPage,
                                    $this->pageVar,
                                    $this->searchVar,
                                    $this->allowVar);

    }

}
