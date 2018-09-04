<?php
include "config.php";

	$obj = json_decode($_POST['userData']);
    $sql_query = "select user_id from USERS where email='$obj->email'";

    $result = mysqli_query($con,$sql_query);
    $row = mysqli_fetch_array($result);

    if ($row['user_id'])
    {
        error_log("Duplicate id");
        $userInfo->user_id = 0;
        $userInfo->first = "error";
        // $jsonUserInfo = json_encode($userInfo);
    }
    else
    {
        error_log("New user id");

        $sql_query = "SELECT MAX(user_id)+1 AS user_id from USERS";
        $newid = mysqli_fetch_array(mysqli_query($con, $sql_query));

        $sql_query = "INSERT INTO USERS (user_id, First, email, password)
                    VALUES ('" . $newid['user_id'] ."', '$obj->name', '$obj->email', '$obj->pwd')";

        if ($con->query($sql_query) === TRUE) {
            $userInfo->user_id = $newid['user_id'];
            $userInfo->first = $row['First'];
            error_log("New user registered successfully");
        }
        else {
            error_log("Query: " . $sql_query . "\nerror: " . $con->error);
        }
    }
    $jsonUserInfo = json_encode($userInfo);
	echo $jsonUserInfo;

mysqli_close($con);
?>