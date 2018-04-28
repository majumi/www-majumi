<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");

$obj = json_decode(file_get_contents('php://input'), true);



$filtro1 = $obj['filtro1'];
$filtro2 = $obj['filtro2'];
$filtro3 = $obj['filtro3'];
$filtro4 = $obj['filtro4'];
$filtro5 = $obj['filtro5'];
$filtro6 = $obj['filtro6'];
$filtro7 = $obj['filtro7'];
$filtro8 = $obj['filtro8'];
$filtro9 = $obj['filtro9'];
$filtro10 = $obj['filtro10'];
$filtro11 = $obj['filtro11'];

$diaEvento = $obj['dia_evento'];
$sala = $obj['sala'];


$tipo = $obj['tipo'];



$whereDia = "";
$whereSala = "";
if($diaEvento != ''){
    $whereDia = "and  dia = $diaEvento";
}

if($diaEvento == '' and $sala != ''){
    
    $whereSala = " and  sala = '$sala'";

}else if($sala != ''){

    $whereSala = " and sala = '$sala'";
}






try{

	$con = new PDO('mysql:host=internal-db.s166531.gridserver.com;dbname=db166531_app', "db166531_app", "C@sta159321",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();



    if(empty($filtro1) and empty($filtro2) and empty($filtro10) and empty($filtro11) and empty($filtro3)and empty($filtro4)and empty($filtro5)and empty($filtro6)and empty($filtro7)and empty($filtro8)and empty($filtro9)){
           
              $sql_post = $con->query("SELECT *
    	 FROM tb_filme  WHERE tb_filme.tipo = $tipo $whereDia $whereSala
    	");

	$result_post = $sql_post->fetchAll();

	echo json_encode($result_post);
    }else{
        
        if($diaEvento != ''){
            $whereDia = "and dia = $diaEvento";
        }
        
         if($sala != ''){
             $whereSala = " and sala = '$sala'";
        }
      
          $sql_post = $con->query("SELECT *
    	 FROM tb_filme WHERE (tb_filme.categoria = '$filtro1' or tb_filme.categoria = '$filtro2' or tb_filme.categoria = '$filtro3' or tb_filme.categoria = '$filtro4' or tb_filme.categoria = '$filtro5' or tb_filme.categoria = '$filtro6' or tb_filme.categoria = '$filtro7' or tb_filme.categoria = '$filtro10' or tb_filme.categoria = '$filtro11' or tb_filme.categoria = '$filtro8' or tb_filme.categoria = '$filtro9') $whereDia $whereSala and tb_filme.tipo = $tipo
    	");

	$result_post = $sql_post->fetchAll();

	echo json_encode($result_post);
    }





	$con->commit();







}catch(Exception $e){

	

	echo $e->getMessage();

}



?>