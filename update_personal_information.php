<?php
include "config.php";

	$obj = json_decode($_POST['personalData']);

	$sql_query = "UPDATE USERS 
					SET First='$obj->p_firstname', Last='$obj->p_lastname', email='$obj->p_email', apt_num='$obj->p_apt', addr_1='$obj->p_addr1', addr_2='$obj->p_addr2', city='$obj->p_city', state='$obj->p_state', zip='$obj->p_zip', phone='$obj->p_phone'
					WHERE user_id='$obj->p_userid'";

	if ($con->query($sql_query) === TRUE) {
	    error_log("User record updated successfully");
	} else {
	    error_log("ERROR\nQuery: " . $sql_query . "\nerror: " . $con->error);
	}
	echo "Inserted";
mysqli_close($con);
?>