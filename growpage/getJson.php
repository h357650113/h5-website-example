<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$target = $_GET['tid'];
$url='http://robot.yuanqutech.com:8031/robot/growup/?id='.$target;  
$html = file_get_contents($url);  
echo $html; 
?>