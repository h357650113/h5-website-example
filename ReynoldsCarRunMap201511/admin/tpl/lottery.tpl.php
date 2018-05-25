<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>数据统计</title>
<link rel="shortcut icon" type="image/x-icon" href="./../image/ant.png" />
<link rel="icon" href="./../image/ant.png" />
<link rel="stylesheet" type="text/css" href="./../css/common.css"/>
<link rel="stylesheet" type="text/css" href="../css/admin.css"/>
<base target="_self"/>
</head>

<body>
	<div class="title">
		<div class="head">
			<p>您好！</p>
		</div>
	</div>
	<div class="main">
		<ul class="menu">
			<li ><a href="./index.php?act=home">用户管理</a></li>
			<li class="select">奖品管理</li>
		</ul>
		<div class="poster">
		  <table class="tablelist">
            	<thead>
            	<tr>
                <th>编号</th>
                <th>奖品名称</th>
                <th>总数量</th>
                <th>中奖数量</th>
                <th>概率</th>
                <th>操作</th>
                </tr>
                </thead>
                <tbody id="mybody">
                <?php foreach($info as $key=>$value){?>
                <tr>
                <td><?php echo $value['id']?></td>
                <td><?php echo $value['name']?></td>
                <td><?php echo $value['allcount']?></td>
                <td><?php echo $value['count']?></td>
                <td><?php echo $value['v']?></td>
                <td><p class="shezhi" id="<?php echo $value['id']?>">设置</p></td>
                </tr> 
                <?php }?>	
                </tbody>
           </table>
		</div>
        <div class="tanceng">
            <ul>
                <li><span>设置数量:</span><input type="text" class="shuliang"/></li>
                <li><span>设置概率:</span><input type="text" class="gailv"/></li>
            </ul>
            <div class="button">
            <button class="queren">确定</button>
            <button class="quexiao">取消</button>
            </div>
            <input type="hidden" value="" class="qid"/>
        </div>
	</div>
</body>
<script src="../js/jquery-1.11.3.min.js"></script>
<script>
$(function(){

	$(".shezhi").click(function(){
     var id = $(this).attr("id");
     $(".qid").val(id)
     $(".tanceng").show();
	})
    $(".quexiao").click(function(){
     $(".tanceng").hide();
    })
    $(".queren").click(function(){
        var id = $(".qid").val()
        var query = $(".shuliang").val()
        var gailv = $(".gailv").val()
        if(query == '' && gailv == ''){
            alert("数量或概率不能为空")
            return;
        }
		$.post("./index.php?act=updaty",{id:id,query:query,gailv:gailv},function(data){
			if(data==1){
				$(".tanceng").hide();
                location.reload()
			}else{
				alert('设置失败，请刷新重试')
			}
		})
    })
	
})
</script>
</html>