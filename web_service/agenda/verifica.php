<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");

$obj = json_decode(file_get_contents('php://input'), true);



$id_usuario = $obj['id_usuario'];
$id_filme = $obj['id_filme'];




try{

	$con = new PDO('mysql:host=internal-db.s166531.gridserver.com;dbname=db166531_app', "db166531_app", "C@sta159321",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();





	$sql_post = $con->query("SELECT id_usuario_filme

	 FROM tb_usuario_filme
	 
	 WHERE tb_usuario_filme.cod_usuario = $id_usuario and cod_filme = $id_filme

	");



	$result_post = $sql_post->fetchAll();



	

	

	echo json_encode($result_post);



	$con->commit();







}catch(Exception $e){

	

	echo $e->getMessage();

}



?>