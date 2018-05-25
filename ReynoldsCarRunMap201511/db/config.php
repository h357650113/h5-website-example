<?php
/*
*
*配置文件
*
***/
error_reporting(0);
include("../db/db.php");
include("../db/function.php");
session_start();
/*数据库配置*/
header("Content-type: text/html; charset=utf-8");  
#define('DB_HOST', '192.168.1.17');
#define('DB_PORT', '3306');
#define('DB_USER', 'root');
#define('DB_PASS', 'root');
#define('DB_NAME', 'xunbao');

define('DB_HOST', SAE_MYSQL_HOST_M);
define('DB_PORT', SAE_MYSQL_PORT);
define('DB_USER', SAE_MYSQL_USER);
define('DB_PASS', SAE_MYSQL_PASS);
define('DB_NAME', SAE_MYSQL_DB);


define("ADMIN",'admin');
define("ADMINPASS",'tanmiqitu.151120#');



?>