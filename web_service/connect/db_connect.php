<?php 

// Report all errors except E_NOTICE
// This is the default value set in php.ini

error_reporting(E_ALL ^ E_NOTICE);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

date_default_timezone_set('America/Sao_Paulo');

Class Con{

	static function getCon(){

		ob_start();
		
		$con = new PDO('mysql:host=localhost;dbname=db166531_olhardecinema18', "db166531", "Olhardecinema2016!",array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

		return $con;
	}

}

?>