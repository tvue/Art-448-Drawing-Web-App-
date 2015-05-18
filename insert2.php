<?php
$con=mysqli_connect("localhost","tuater_user","lollipopz","tuater_lollipopz");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="INSERT INTO drawings (id, type, title, image)
VALUES('$_POST[id]','$_POST[type]','$_POST[title]','$_POST[pic]')";

if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "Success!";

mysqli_close($con);
?>