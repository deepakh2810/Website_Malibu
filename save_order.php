<?php
include "config.php";

	$obj = json_decode($_POST['myData']);
	// echo $obj;
	$sql_query = "SELECT MAX(pending_order_id)+1 AS order_id from PENDINGORDERS";
	$newid = mysqli_fetch_array(mysqli_query($con, $sql_query));
	error_log("newid: " . json_encode($newid));
	if (empty($newid['order_id'])) {
		$newid = array('order_id' => 1);
	}
	$sql_query = "INSERT INTO PENDINGORDERS (pending_order_id, summary, total, user_id, o_time, firstname, address, phone)
					VALUES ('". $newid['order_id'] ."', '"  . $obj->summary . "', '" . $obj->total . "', '" . 3
							  . "', NOW(), '" . $obj->name . "', '" . $obj->address . "', '" . $obj->phone . "')";

	if ($con->query($sql_query) === TRUE) {
	    error_log("New record in order table created successfully");
	} else {
	    error_log("ERROR\nQuery: " . $sql_query . "\nerror: " . $con->error);
	}
	echo "Inserted";
mysqli_close($con);
?>