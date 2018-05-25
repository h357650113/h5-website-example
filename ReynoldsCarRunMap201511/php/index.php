<?php
include("../db/config.php");

class Lottery {
	public function route() {
		$a = @$_REQUEST['a'];
	    if (method_exists('Lottery', $a)) {
    	    $rst = $this->$a();
    	    echo json_encode($rst);
    	}else{
        	header("HTTP/1.0 404 Not Found");
    	}
	}
    
    function returnmsg($code, $msg) {
        echo json_encode(array('code'=>$code, 'msg'=>$msg));
        exit;
    }
        
    //添加用户
    # 0:未中奖
    # 1:一等奖
    # 2:二等奖
    # 3:三等奖
    # -1:错误
    function addUser(){
        $username = $_REQUEST['username']?strip_tags($_REQUEST['username']):'';
        $tel = $_REQUEST['tel']?strip_tags($_REQUEST['tel']):'';
        if ($username == '') {
            $this->returnmsg(-1, '请输入姓名');
        }
        if(preg_match("/^1[3|4|5|7|8|9][0-9]\d{4,8}$/",$tel)){
            $db = new DB();
            $user = $db->get_one("select tel from user where tel='".$tel."' limit 1");
            if($user){
                $sql = "select * from user where tel='".$tel."'and name='".$username."'and date= '".date("Y-m-d")."' limit 1";
                $reuser = $db->get_one($sql);
                if($reuser){
                    $this->returnmsg(0, '未中奖');
                }else{
                   $this->getlottery($tel);
                }
            }else{
                $sql = "insert into user(tel,name,count,flag,date,createdate) values('".$tel."','".$username."',0,0,'".date("Y-m-d")."','".date("Y-m-d H:i:s")."')";
                if(!$db->query($sql)) {
                    $this->returnmsg(0, '未中奖');
                }
                $this->getlottery($tel);
            }
        }else{
            $this->returnmsg(-1, '请输入正确的手机号');
        }
    }
    //判断用户抽奖次数(作废)
    function checkUserCount($tel){
        $sql = "select count,date from user where tel='".$tel."'and date='".date("Y-m-d")."'";
        $db = new DB();
        $count = $db->sql_query_row($sql);
        if($count['count']>=2){
            $arr = array('code'=>0,'msg'=>'您的抽奖次数已用完');
            echo json_encode($arr);
            exit;
        }else if($count['count']<2 && $count['date']== date("Y-m-d")){
            $newcount = $count['count']+1;
            $sql = "update user set date='".date("Y-m-d")."',count='".$newcount."' where tel='".$tel."'";
            $db->query($sql);
        }else if($count['count']>=2 && $count['date']!= date("Y-m-d")){
            $sql = "update user set date='".date("Y-m-d")."',count=0' where tel='".$tel."'";
            $db->query($sql);
        }
    }

    //抽奖
    function getlottery($tel){
        //$this->returnmsg(3, '未中奖');
        $sql = "select * from prize";
        $usersql = "select flag from user where tel='".$tel."'";
        $db = new DB();
        $userinfo = $db->get_one($usersql);
        if($userinfo == 1){
            $this->returnmsg(0, '未中奖');
        }
        $info = $db->sql_query($sql);
        foreach($info as $key => $value){
            $prize_arr[$value['type']]=array("id"=>$value['type'],"prize"=>$value['name'],'v'=>$value['v']);
        }
        foreach ($prize_arr as $key => $val) { 
            $arr[$val['id']] = $val['v']; 
        } 
       $rid = $this->get_rand($arr);
       if($rid != 0){
            #checkUserCount($tel);
            $prizesql = "select allcount,count from prize where id ='".$rid."'";
            $prizecount =$db->sql_query_row($prizesql);
            if($prizecount['allcount'] == $prizecount['count']){
                $this->returnmsg(0, '未中奖');
            }else{
                $prizecount['count'] = $prizecount['count']+1;
                $upsql = "update prize set count='".$prizecount['count']."' where type='".$rid."'";
                $db->query($upsql);

                $sql ="update user set flag =1,date='".date("Y-m-d")."',prizename='".$prize_arr[$rid]['prize']."' where tel='".$tel."'";
                $db->query($sql);
                $this->returnmsg($rid, $prize_arr[$rid]['prize']);
            }
       }else{
           $this->returnmsg(0, '未中奖');
       }
    }
    //概率计算函数
    function get_rand($proArr) { 
        $result = ''; 
        //概率数组的总概率精度 
        $proSum = array_sum($proArr); 
     
        //概率数组循环 
        foreach ($proArr as $key => $proCur) { 
            $randNum = mt_rand(1, $proSum); 
            if ($randNum <= $proCur) { 
                $result = $key; 
                break; 
            } else { 
                $proSum -= $proCur; 
            } 
        } 
        unset ($proArr); 
     
        return $result; 
    }
    
    function addAddress(){
        $address = $_REQUEST['address']?strip_tags($_REQUEST['address']):'';
        $mytel = $_REQUEST['mytel']?strip_tags($_REQUEST['mytel']):'';
        if ($address == '') {
            $this->returnmsg(-1, '请输入地址');
        }
        if ($mytel == '') {
            $this->returnmsg(-1, '请输入手机号');
        }
        
        $sql = "select tel from user where tel='".$mytel."'and flag=1 limit 1";
        $db =new DB();
        $user = $db->get_one($sql);
        if($user){
            $upsql = "update user set address='".$address."'where tel='".$mytel."'";
            $addressflag = $db->query($upsql);
            if ($addressflag){
                $this->returnmsg(0, '地址添加成功');
            }else{
                $this->returnmsg(-1, '地址添加失败,请稍后重试，或者截图保留');
            }
        }else{
            $this->returnmsg(-1, '您未中奖');
        }
    }
}
$lottery = new Lottery();
$lottery->route();
//addUser($tel,$username);
//getlottery($tel)
?>