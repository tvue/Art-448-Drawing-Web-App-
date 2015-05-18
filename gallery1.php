<!--
*****************************************************
*
* LOLLI-POPZ GALLERY 
* By: TUATER VUE
*
******************************************************
-->

<?php
$host = 'localhost';
$user = 'tuater_user';
$pw = 'lollipopz';
$db = 'tuater_lollipopz';
    $conn = mysql_connect($host,$user,$pw);
    mysql_select_db($db);
    $sql = "SELECT * FROM drawings ORDER BY id DESC"; 
    $result = mysql_query($sql) or die('Bad query at 12!'.mysql_error());
?>
<HTML> 
<link rel="stylesheet" type="text/css" href="style1.css">   

<div id=H>Lolli-Popz Gallery</div>

<h1></h1>
<BODY>
<!--<div class="sidebar1"></div>
<div class="sidebar2"></div>-->
<?php
	while($row = mysql_fetch_array($result)) {
	?>
       <div class ="centerPanel">
        <div style=" height: 400px; width: 320px;">
        <div class ="backdrop"><h3> Entry: <?php echo $row['id']; ?> </h3></div>
        <h2>"<?php echo $row['title']; ?>"</h2>
		<img onclick = ran_col() src=<?php echo $row['image']; ?> /></div>
        </div>
        
<?php		
	}
    mysql_close($conn);
?>   
</BODY>
</HTML>