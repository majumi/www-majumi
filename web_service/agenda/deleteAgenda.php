<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");

$obj = json_decode(file_get_contents('php://input'), true);



$id_usuario = $obj['id_usuario'];
$dia_evento = $obj['dia_evento'];
$cod_filme = $obj['id_filme'];
$dia = $obj['dia'];




try{

	$con = new PDO('mysql:host=internal-db.s166531.gridserver.com;dbname=db166531_app', "db166531_app", "C@sta159321",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();




    echo "DELETE FROM tb_usuario_filme
	 
	 WHERE tb_usuario_filme.cod_usuario = $id_usuario and tb_usuario_filme.cod_filme = $cod_filme";
	$sql_post = $con->query("DELETE FROM tb_usuario_filme
	 
	 WHERE tb_usuario_filme.cod_usuario = $id_usuario and tb_usuario_filme.cod_filme = $cod_filme

	");







	

	

	echo json_encode($result_post);



	$con->commit();







}catch(Exception $e){

	

	echo $e->getMessage();

}



?>