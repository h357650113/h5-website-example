<?php
include("../db/config.php");

$a = $_REQUEST['act']?strip_tags($_REQUEST['act']):'user';



//登录
if($a=='user'){
	$username = $_REQUEST['username'];
	$password = $_REQUEST['password'];
	if($username=='' || $password=='' || $username!=ADMIN || $password!=ADMINPASS){
		include("./tpl/user.tpl.php");
		exit;
	}else{
		setcookie('username','admin');
		header('Location:./index.php?act=home');
	}
	exit;
}
//后台首页
elseif($a=='home'){
	if($_COOKIE['username'] != 'admin'){
		header('Location:./index.php');
		exit;
	}
    if(flag !=''){
        $flag = intval($_REQUEST['flag']);
    }else{
        $flag = 1;
    }
	$db = new DB();
	$p = $_REQUEST['p']?intval($_REQUEST['p']):1;
	if($p<1){
		$p = 1;
	}
	$sql = "select count(id) as num from user where flag = '".$flag."'";
	$db = new DB();
	$num = $db->get_one($sql);
	$show_num = 12;
	$allpage = ceil($num/$show_num);
	$start = ($p-1)*$show_num;
	if($p>$allpage){
		$p = $allpage;
	}
	
	$sql = "select * from user where `flag`='".$flag."' limit $start,$show_num";
	$info = $db->sql_query($sql);
	include("./tpl/home.tpl.php");
}

elseif($a=='lottery'){
	if($_COOKIE['username'] != 'admin'){
		header('Location:./index.php');
		exit;
	}
	$db = new DB();
	$sql = "select * from prize ";
	$info = $db->sql_query($sql);
	include("./tpl/lottery.tpl.php");
}
//删除
elseif($a=='del'){
	if($_COOKIE['username'] != 'admin'){
		header('Location:./index.php');
		exit;
	}

	$id = $_REQUEST['id']?intval($_REQUEST['id']):'';
	if($id>0){
		$sql = "update user set status=1 where id=$id";
		$db = new DB();
		if($db->query($sql)){
			echo 1;exit;
		}
	}else{
		echo 0;exit;
	}
}
//设置数量或概率
elseif($a=='updaty'){
	if($_COOKIE['username'] != 'admin'){
		header('Location:./index.php');
		exit;
	}

	$id = $_REQUEST['id']?intval($_REQUEST['id']):'';
    $query = $_REQUEST['query']?intval($_REQUEST['query']):'';
    $gailv = $_REQUEST['gailv']?intval($_REQUEST['gailv']):'';
	if($id>0){
        $sql = '';
        if ($query != '' && $gailv != '') {
            $sql = "update prize set allcount='".$query."',v='".$gailv."' where id='".$id."'";
        } else if ($query != '') {
            $sql = "update prize set allcount='".$query."' where id='".$id."'";
        } else if ($gailv != '') {
            $sql = "update prize set v='".$gailv."' where id='".$id."'";
        }
        if ($sql != '') {
            $db = new DB();
            if($db->query($sql)){
                echo 1;exit;
            }
        }
	}else{
		echo 0;exit;
	}
}
else{
	echo '<p style="font-size:24px">404 未找到</p>';
}