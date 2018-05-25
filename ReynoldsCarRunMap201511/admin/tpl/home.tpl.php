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
			<li class="select">用户管理</li>
			<li><a href="./index.php?act=lottery">奖品管理</a></li>
		</ul>
		<div class="poster">
              <div>
        		<ul class="menu" >
			           <li class="user zhongjiang <?php if ($flag == 1) echo 'select'; ?>"><a href="./index.php?act=home&flag=1">中奖用户</a></li>
			           <li class="user weizhongjiang <?php if ($flag != 1) echo 'select'; ?>"><a href="./index.php?act=home&flag=0">未中奖用户</a></li>
		        </ul>
                <div class="date">
                    <input type="text" class="startdate" placeholder="开始日期 yyyy-mm-dd">
                    <span>至</span>
                    <input type="text" class="enddate" placeholder="结束日期 yyyy-mm-dd">
                    <button class="daochu">导出</button>
                </div>
             </div>
				 <table class="tablelist">
                    	<thead>
                    	<tr>
                        <th>编号</th>
                        <th>用户名</th>
                        <th>手机号</th>
                        <th>奖品名称</th>
                        <th>地址</th>
                        <!--<th>操作</th>-->
                        </tr>
                        </thead>
                        <tbody id="mybody">
                        <?php foreach($info as $key=>$value){?>
                        <tr>
                        <td><?php echo $value['id']?></td>
                        <td><?php echo $value['name']?></td>
                        <td><?php echo $value['tel']?></td>
                        <td><?php echo $value['prizename']?></td>
                        <td><?php echo $value['address']?></td>
                        <!--<td><p class="del" id="<?php echo $value['id']?>">删除</p></td>-->
                        </tr> 
                        <?php }?>	
                        </tbody>
                  </table>

	
			<div class="page">
              
				<?php if($flag == 1){
                    echo page($allpage,$p,'./index.php?act=home&flag=1');
                }else{
                    echo page($allpage,$p,'./index.php?act=home');
                }
					
				?>
			</div>
		</div>
	</div>
</body>
<script src="../js/jquery-1.11.3.min.js"></script>
<script>
$(function(){
	$(".del").click(function(){
		var id = $(this).attr("id");
		$.post("./index.php?act=del",{id:id},function(data){
			if(confirm("确认删除？")){
				if(data==1){
					$("#"+id).parent().remove();
				}else{
					alert('删除失败，请刷新重试')
				}
			}
		})
	})

    $(".daochu").click(function(){
        var startdate = $(".startdate").val()
        var enddate = $(".enddate").val()
        if(startdate==''|| enddate==''){
            alert('日期不能为空');
            return 
        }
        window.location.href='do.php?action=export&startdate='+startdate+'&enddate='+enddate
    })
	
})
</script>
</html>