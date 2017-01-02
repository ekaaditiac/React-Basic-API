# siquery
siQuery is a simple SQL builder based on PDO for PHP

## Usage
Include siquery class;

```php
require_once 'src/siquery.php';
```

### Select Statement
```php
$db = new siquery();
$users = $db->from('users')
            ->orderBy('id DESC')
            ->get();

```
Executed Query :
```sql
SELECT *
FROM users
ORDER BY id DESC
```

Another example
```php
$users = $db->select('username, email')
            ->from('users')
            ->orderBy('id DESC')
            ->get();
```
Executed Query :
```sql
SELECT username, email
FROM users
ORDER BY id DESC
```

### Join Statement 
```php
$users = $db->from('users')
          ->innerJoin('posts', 'user_id')
          ->where('user_id',1)
          ->get();
```
Executed Query :
```sql
SELECT * 
FROM users
INNER JOIN posts
USING(user_id)
WHERE user_id = 1
```

### Select first row
```php
$users = $db->from('users')
          ->where('user_id', 1)
          ->first();
```

### Select one column
```php
$username = $db->from('users')
          ->where('user_id', 1)
          ->fetch('username');
```

### Support paginate
```php
$users = $db->from('users')
          ->paginate(20);
```
HTML for pagination will generate by function $db->getPagenav(); , so you can use it for pagination link in your view

### Search
```php
$books = $db->from('books')
          ->search('title, author')
          ->get();
```
It will use $_GET['search'] variable by default to get a keyword for search, you can set search variable like this
```php
$db = new siquery();
$db->searchVar = 'MySearchVariable';
```

##Data Manipulation Languange
###Insert
```php
$insert = $db->insert('users', ['username'=>'John', 'email'=>'john@doe.com'])
          ->execute();
```

###Update
```php
$update = $db->update('users', ['username'=>'Dale', 'email'=>'dale@email.com'])
          ->where('user_id', 2)
          ->execute();
```

###Delete
```php
$delete = $db->delete('users')
          ->where('user_id', 2)
          ->execute();
```
or
```php
$delete = $db->delete('users', 'user_id = 2')
          ->execute()
```

## Transaction
###Example :
```php
$db = new siquery();

$db->TRANSACTION(); //Begin Transaction

  $insert = $db->insert('users', ['username' => 'John'])
            ->execute();
  
  $lastId = $db->lastId();
  
  $update = $db->update('books', ['user_id' => $lastId])
              ->where('books_id', 4)
              ->execute();

if(empty($db->getError())){
    
    $db->COMMIT(); //Commit transaction

} else {

    $db->ROLLBACK(); //Rollback transaction

}
```
