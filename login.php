<?php
include "config.php";

	$obj = json_decode($_POST['userData']);
    $sql_query = "select user_id, First, Last from USERS where email='".$obj->email."' and password='".$obj->pwd."'";

    $result = mysqli_query($con,$sql_query);
    $row = mysqli_fetch_array($result);

    if($row['user_id'] > 0){
	    $userInfo->user_id = $row['user_id'];
	    $userInfo->first = $row['First'];
    }
    else
    {
	    $userInfo->user_id = 0;
	    $userInfo->first = "error";
    }
    $jsonUserInfo = json_encode($userInfo);
	echo $jsonUserInfo;

mysqli_close($con);
?>