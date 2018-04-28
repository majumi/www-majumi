<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");

$obj = json_decode(file_get_contents('php://input'), true);



$id_usuario = $obj['id_usuario'];


try{

	$con = new PDO('mysql:host=internal-db.s166531.gridserver.com;dbname=db166531_app', "db166531_app", "C@sta159321",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();





	$sql_post = $con->query("SELECT tb_filme.*

	 FROM tb_usuario_filme
	 
	 INNER JOIN tb_usuario ON (tb_usuario_filme.cod_usuario = tb_usuario.id_usuario)
	 
	 INNER JOIN tb_filme ON (tb_filme.id_filme = tb_usuario_filme.cod_filme)
	 
	 WHERE tb_usuario_filme.cod_usuario = $id_usuario GROUP BY tb_filme.id_filme

	");



	$result_post = $sql_post->fetchAll();



	

	

	echo json_encode($result_post);



	$con->commit();







}catch(Exception $e){

	

	echo $e->getMessage();

}



?>