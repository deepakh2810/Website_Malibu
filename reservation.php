<?php
include "config.php";

	$obj = json_decode($_POST['userData']);
	// echo $obj;
	$sql_query = "SELECT MAX(reserve_id)+1 AS reserve_id from RESERVATIONS";
	$newid = mysqli_fetch_array(mysqli_query($con, $sql_query));

	$sql_query = "INSERT INTO RESERVATIONS (reserve_id, name, email, phone, guests, date, time, user_id)
					VALUES ('". $newid['reserve_id'] ."', '$obj->reg_name', '$obj->reg_email', '$obj->reg_phone'".
													    ",'$obj->reg_number', '$obj->reg_date', '$obj->reg_time', '$obj->user_id')";

	if ($con->query($sql_query) === TRUE) {
	    error_log("New reservation is created successfully");
		echo "Success";
	} else {
	    error_log("Query: " . $sql_query . "\nerror: " . $con->error);
		echo "Problem with reservation details";
	}

?>