<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");

$obj = json_decode(file_get_contents('php://input'), true);



$email = $obj['email'];
$senha = $obj['senha'];


try{

	$con = new PDO('mysql:host=localhost;dbname=db_majumi', "root", "",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();

	$sql_login = $con->query("SELECT *

	 FROM tb_usuario 

	 WHERE email = '$email' AND senha = '$senha' AND excluido = 0");



	$usuario = $sql_login->fetchAll();

	echo json_encode($usuario);



	$con->commit();







}catch(Exception $e){

	

	echo $e->getMessage();

}



?>