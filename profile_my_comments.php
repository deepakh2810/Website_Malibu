<?php
include "config.php";

	$obj = json_decode($_POST['userData']);

	$sql_query = "SELECT * from Ratings WHERE user_id='$obj->user_id' ORDER BY r_time DESC";
	$sth = mysqli_query($con,$sql_query);
	$rows = array();

	while ($row = mysqli_fetch_array($sth)) {
		// $rows['root_name'] = $row;
		array_push($rows, $row);
	}
	// error_log(json_encode($rows));
	echo json_encode($rows);

mysqli_close($con);
?>