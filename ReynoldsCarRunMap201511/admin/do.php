<?php

/**
 * @
 * @Description:
 * @Copyright (C) 2011 helloweba.com,All Rights Reserved.
 * -----------------------------------------------------------------------------
 * @author: Liurenfei (lrfbeyond@163.com)
 * @Create: 2012-5-1
 * @Modify:
*/
include_once ("../db/config.php");
include("./db/db.php");
$action = $_GET['action'];
if ($action == 'import') { //导入CSV
	$filename = $_FILES['file']['tmp_name'];
	if (empty ($filename)) {
		echo '请选择要导入的CSV文件！';
		exit;
	}
	$handle = fopen($filename, 'r');
	$result = input_csv($handle); //解析csv
	$len_result = count($result);
	if($len_result==0){
		echo '没有任何数据！';
		exit;
	}
	for ($i = 1; $i < $len_result; $i++) { //循环获取各字段值
		$name = iconv('gb2312', 'utf-8', $result[$i][0]); //中文转码
		$sex = iconv('gb2312', 'utf-8', $result[$i][1]);
        $flag = iconv('gb2312', 'utf-8', $result[$i][2]);
        $ready = iconv('gb2312', 'utf-8', 'none');
		@$data_values .= "('$name','$sex','$flag','$ready'),";
	}
	$data_values = substr($data_values,0,-1); //去掉最后一个逗号
	fclose($handle); //关闭指针
	$query = mysql_query("insert into c4choujiang (name,tel,flag,ready) values $data_values");//批量插入数据表中
	if($query){
		echo '导入成功！';
	}else{
		echo '导入失败！';
	}
} elseif ($action=='export') { //导出CSV
    $startdate = $_REQUEST['startdate']?strip_tags($_REQUEST['startdate']):'';
    $enddate = $_REQUEST['enddate']?strip_tags($_REQUEST['enddate']):'';
    $db = new DB();
    $result = $db->query("select * from user where unix_timestamp(createdate) >= unix_timestamp('".$startdate." 00:00:00') and unix_timestamp(createdate) <= unix_timestamp('".$enddate." 23:59:59')");
    $str = "姓名,电话,奖品名称,地址,日期\n";
    $str = iconv('utf-8','gb2312',$str);
    while($row=mysql_fetch_array($result)){
        $name = iconv('utf-8','gb2312',$row['name']);
        $tel = iconv('utf-8','gb2312',$row['tel']);
        $prizename = iconv('utf-8','gb2312',$row['prizename']);
        $address = iconv('utf-8','gb2312',$row['address']);
        $createdate = iconv('utf-8','gb2312',$row['createdate']);
    	$str .= $name.",".$tel.",".$prizename.",".$address.",".$createdate."\n";
    }
    $filename = date('Ymd').'.csv';
    export_csv($filename,$str);
} elseif ($action == 'clearall') {
    clearall();
    echo '已清空';
}
function input_csv($handle) {
	$out = array ();
	$n = 0;
	while ($data = fgetcsv($handle, 10000)) {
		$num = count($data);
		for ($i = 0; $i < $num; $i++) {
			$out[$n][$i] = $data[$i];
		}
		$n++;
	}
	return $out;
}

function export_csv($filename,$data) {
    header("Content-type:text/csv");
    header("Content-Disposition:attachment;filename=".$filename);
    header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
    header('Expires:0');
    header('Pragma:public');
    echo $data;
}

function clearall() {
    return;
    mysql_query("delete from c4choujiang");
}
?>
