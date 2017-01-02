<?php

class paginate{

    function __construct($advance = true){
        $this->advance = $advance;
    }

    function generateHtml($jmlData, $limitPage, $pageVar, $searchVar, $allowVar){
            $HTML = null;

            if(empty($jmlData)){
                die('Paginate not defined');
            }

            $p = isset($_GET[$pageVar]) ? $_GET[$pageVar] : 1;
            $searchVal = isset($_GET[$searchVar]) ? $_GET[$searchVar] : null;

            $link = [];
            //Generate Link
            if($searchVal!= null){
                $link[] = $searchVar.'='.$searchVal;
            }

            if(isset($_GET) AND !empty($allowVar)){
                foreach ($allowvar as $key => $value) {
                    if(isset($_GET[$value]) AND $_GET[$value]!=null){
                        $link[] = $value.'='.$_GET[$value];
                    }
                }
            }

            if($p !=null){
                $link[] = $pageVar.'=';
            }

            $link = implode("&", $link);

            $jml_hal = (int)ceil($jmlData / $limitPage);
            if($jml_hal > 1 AND $p <= $jml_hal AND $p !=null){
                if($jml_hal <= 5){$awal = 1;$akhir = $jml_hal;
                }elseif($jml_hal > 5){
                    $end = $jml_hal - $p;
                    if($p <= 3){$awal =1;$akhir = $awal + 4;
                    }elseif($end < 3){$awal = $jml_hal - 4;$akhir = $jml_hal;
                    }else{$awal  = $p-2;$akhir = $p+2;
                    }
                }

                if($this->advance){
                    $HTML .= '<li><a>&nbsp;<small>Halaman '.$p.' dari '.$jml_hal.' | '.$jmlData.' data</small></a></li>';
                }

                if($p!=1 AND $jml_hal > 6){
                    $HTML .= '<li><a title="Halaman Pertama" href="?'.$link.'1"><i class="fa fa-chevron-left"></i></a></li>';
                }

                if($p > 1){
                    $HTML .= '<li><a title="Halaman Sebelumnya" href="?'.$link.($p - 1).'"><i class="fa fa-chevron-left"></i></a></li>';
                }
                    for($i=$awal;$i<=$akhir;$i++){
                        if($i!=$p){
                            $HTML .= '<li><a href="?'.$link.$i.'">'.$i.'</a></li>'; //link
                        }else{
                            $HTML .= '<li class="active"><a>'.$i.'</a></li>'; //active link
                        }
                    }

                if($p < $jml_hal){
                    $HTML .= '<li><a title="Halaman Selanjutnya" href="?'.$link.($p + 1).'"><i class="fa fa-chevron-right"></i></a></li>';
                }

                if($p != $jml_hal AND $jml_hal > 6){
                    $HTML .= '<li><a title="Halaman Terakhir" href="?'.$link.$jml_hal.'"><i class="fa fa-chevron-right"></i></a></li>';
                }
            }

            return $HTML;

    }

}
