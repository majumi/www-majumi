<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");

$obj = json_decode(file_get_contents('php://input'), true);


$nome = $obj['nome'];
$email = $obj['email'];
$senha = $obj['senha'];




try{

	$con = new PDO('mysql:host=localhost;dbname=db_majumi', "root", "",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();



	$sql_login = $con->exec("INSERT INTO tb_usuario (nome,email,senha,avatar,excluido,data) VALUES ('$nome', '$email', '$senha', 'oi.png', 0, now())");


	$con->commit();


echo "deu_bom";




}catch(Exception $e){

	

	echo $e->getMessage();

}



?>