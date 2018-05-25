<?php

/*
*常用方法合集
*
**/

//截取字符串
function perfectStr($str,$length=12,$suffix=true,$charset="utf-8",$start  = 0) {
    if(function_exists("mb_substr")) {
        if(mb_strlen($str, $charset) <= $length) return $str;
        $slice = mb_substr($str, $start, $length, $charset);
    } else {
        $re['utf-8']   = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
        $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
        $re['gbk']          = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
        $re['big5']          = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
        preg_match_all($re[$charset], $str, $match);
        if(count($match[0]) <= $length) return $str;
        $slice = join("",array_slice($match[0], $start, $length));
    }
    if($suffix) return $slice."…";
    return $slice;
}


/* 获取微信信息 */
function getWeixinUserInfo($openid) {
//	$openid = 'oRU2njpNj4ioGc07l_rHaxUL_X1A';
    
    $timestamp = strtotime(date('Y-m-d H:i:s'));
    
    $tmpSig = md5(API_KEY . API_SECRET . $timestamp);
        
    $url = 'http://api.socialjia.com/index.php?apiKey='.API_KEY.'&timestamp='.$timestamp.'&sig='.$tmpSig.'&a=User&m=get&openid='.$openid;
    
    $html = @file_get_contents($url);
    $ret = json_decode($html);
    
    if($ret->error == 0){
        return $ret->data->subscribe;
    }else{
        return 0;
    }
    
}


//分页
function page($allpage,$nowpage,$url='',$j=5,$ajax=1){
    if($allpage<=1){
        return '';
    }
    

    
    if($nowpage==1){
        $class='now-page';
    }else{
        $class='';
    }


    $str .= '<div  class="page"><a href="'.$url.'&p='.($nowpage-1).'">上一页</a><a href="'.$url.'&p=1" class="'.$class.'">1</a>';

    if($nowpage-ceil($j/2)>2){
        $str .= '<a>...</a>';
    }

    for($i=1;$i<=$allpage;$i++){
        if($i==1)continue;
        if($i==$allpage)continue;
        if($i==$nowpage){$class="now-page";}else{$class='';}
        if($allpage<=$j){
            $str .= '<a class="'.$class.'" href="'.$url.'&p='.$i.'">'.$i.'</a>';
        }else{
            
            if($i+ceil($j/2)>=$nowpage && $i<$nowpage){
                $str .= '<a href="'.$url.'&p='.$i.'">'.$i.'</a>';
            }

            if($i==$nowpage){
                $str .='<a class="now-page">'.$i.'</a>';
            }

            if($nowpage+ceil($j/2)>=$i && $i>$nowpage){
                $str .= '<a  href="'.$url.'&p='.$i.'">'.$i.'</a>';
            }

        }
    }

    if($nowpage+ceil($j/2)<$allpage-1){
        $str .= '<a>...</a>';
    }
    if($nowpage==$allpage){
        $class='now-page';
    }else{
        $class='';
    }
    $str .= '<a class="'.$class.'" href="'.$url.'&p='.$allpage.'">'.$allpage.'</a><a href="'.$url.'&p='.($nowpage+1).'">下一页</a></div>';
    if(!strstr($str,"?")){
        $str = str_replace("&","?",$str);
    }
    return $str;
}


/**
 * 获取客户端IP地址
 * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @param boolean $adv 是否进行高级模式获取（有可能被伪装） 
 * @return mixed
 */
function get_client_ip($type = 0,$adv=false) {
    $type       =  $type ? 1 : 0;
    static $ip  =   NULL;
    if ($ip !== NULL) return $ip[$type];
    if($adv){
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos    =   array_search('unknown',$arr);
            if(false !== $pos) unset($arr[$pos]);
            $ip     =   trim($arr[0]);
        }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip     =   $_SERVER['HTTP_CLIENT_IP'];
        }elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     =   $_SERVER['REMOTE_ADDR'];
        }
    }elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip     =   $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = sprintf("%u",ip2long($ip));
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}


//判断是否是微信浏览器
function is_weixin(){ 
	if ( strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ) {
			return true;
	}	
	return false;
}


//验证手机号
function checkPhone($num){
	if(preg_match("/^13[0-9]{1}[0-9]{8}$|15[0189]{1}[0-9]{8}$|189[0-9]{8}$|18[0-9]{9}/",$num)){    
			//验证通过    
				return true;
		}else{    
			//手机号码格式不对    
				 return false;
		}
}