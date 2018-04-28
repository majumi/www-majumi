<?php  

header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: *");

header("Access-Control-Allow-Headers: Content-Type");

header("Access-Control-Allow-Credentials: true");











try{

	$con = new PDO('mysql:host=internal-db.s166531.gridserver.com;dbname=db166531_app', "db166531_app", "C@sta159321",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

	$con->beginTransaction();





	$sql_post = $con->query("SELECT *

	 FROM tb_post 

	 INNER JOIN tb_usuario ON (tb_post.cod_usuario = tb_usuario.id_usuario)

	 WHERE tb_post.status = 1 GROUP BY tb_post.id_post");



	$result_post = $sql_post->fetchAll();



	

	

	echo json_encode($result_post);



	$con->commit();







}catch(Exception $e){

	

	echo $e->getMessage();

}



?>