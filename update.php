<?php 
include "config.php";
$request_data = json_decode($_POST['request_data']);

if($request_data->cmd == "delete") {
    error_log("delete cmd");
    $category = $request_data->category;
    $subcategory = $request_data->subCategory;
    $itemname = $request_data->item;
    $sql = "DELETE FROM menuitems where category= '$category' and subcategory= '$subcategory' 
            and name= '$itemname'";
   
}
else if($request_data->cmd == "insert") {
    error_log("insert cmd");
    $category = $request_data->category;
    $subcategory = $request_data->subcategory;
    $name = $request_data->name;
    $description = $request_data->description;
    $cost = $request_data->cost;
    $sql = "INSERT INTO menuitems (category, subcategory, name, description, cost) 
            VALUES ('$category', '$subcategory', '$name', '$description', '$cost')";
}
else if($request_data->cmd == "update"){
    $category = $request_data->category;
    $subcategory = $request_data->subcategory;
    $name = $request_data->name;
    $description = $request_data->description;
    $cost = $request_data->cost;

    $sql = "UPDATE menuitems SET description = '$description', cost = '$cost' 
            WHERE category= '$category' and subcategory= '$subcategory' 
            and name= '$name'";

}

$result = mysqli_query($con, $sql);
if(!$result){
    error_log("Error description: " . mysqli_error($con));
}
echo "OK";
?>