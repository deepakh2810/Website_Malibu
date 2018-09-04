<?php
include "config.php";

	$obj = json_decode($_POST['myData']);
	// echo $obj;
	$sql_query = "SELECT MAX(rating_id)+1 AS rating_id from Ratings";
	$newid = mysqli_fetch_array(mysqli_query($con, $sql_query));

	$sql_query = "INSERT INTO Ratings (rating_id, message, username, r_time, rating, user_id)
					VALUES ('". $newid['rating_id'] ."', '"  . $obj->message . "', '" . $obj->name . "', Now(), '" . $obj->rating ."', '"
								. $obj->user_id . "')";
	// $sth = mysqli_query($con,$sql_query);


	if ($con->query($sql_query) === TRUE) {
	    error_log("New record created successfully");
	} else {
	    error_log("Query: " . $sql_query . "\nerror: " . $con->error);
	}

	echo "Inserted";

mysqli_close($con);
?>