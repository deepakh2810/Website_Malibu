<?php
include "config.php";

	$obj = json_decode($_POST['orderData']);

	$sql_query = "ALTER TABLE ORDERS AUTO_INCREMENT=1;";
	if ($con->query($sql_query) === TRUE) {
	    error_log("Auto incremented ORDERS table successfully");
	} else {
	    error_log("ERROR\nQuery: " . $sql_query . "\nerror: " . $con->error);
	}

	$sql_query = "INSERT INTO ORDERS (summary, total, user_id, o_time, firstname, address, phone)
					SELECT summary, total, user_id, o_time, firstname, address, phone
					FROM PENDINGORDERS
					WHERE pending_order_id=" . $obj->order_id;

	if ($con->query($sql_query) === TRUE) {
	    error_log("Record moved successfully");
	} else {
	    error_log("ERROR\nQuery: " . $sql_query . "\nerror: " . $con->error);
	}

	$sql_query = "DELETE FROM PENDINGORDERS
					WHERE pending_order_id=" . $obj->order_id;

	if ($con->query($sql_query) === TRUE) {
	    error_log("Deleted record successfully");
	} else {
	    error_log("ERROR\nQuery: " . $sql_query . "\nerror: " . $con->error);
	}

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