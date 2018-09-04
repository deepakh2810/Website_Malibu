<?php
include "config.php";

	$sql_query = "SELECT * from PENDINGORDERS ORDER BY o_time ASC";
	$sth = mysqli_query($con,$sql_query);
	$rows = array();

	while ($row = mysqli_fetch_array($sth)) {
		// $rows['root_name'] = $row;
		array_push($rows, $row);
	}
	echo json_encode($rows);

mysqli_close($con);
?>