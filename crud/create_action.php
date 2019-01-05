<?php
//Require_none "config.php"
require_once "config.php";

//Define variables and initialize with empty value
$name = $address = $salary = "";
$name_err = $address_err = $salary_err = "";

//Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  //Validate name
  $input_name = trim($_POST["name"]);

  if (empty($input_name)) {
    $name_err = "Please enter a name.";
  } elseif(!filter_var($input_name, FILTER_VALIDATE_REGEXP,
    array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))) {
    $name_err = "Please enter a valid name.";
  } else {
    $name = $input_name;
  }

  //validate salary
  $input_salary = trim($_POST["salary"]);
  if(empty($input_salary)) {
    $salary_err = "Please enter the salary mount!";
  } elseif(!ctype_digit($input_salary)) {
    $salary_err = "Please enter a positive integer value!";
  } else {
    $salary = $input_salary;
  }

  //validate address
  $input_address = trim($_POST["address"]);
  if (empty($input_address)) {
    $address_err = "Please enter an address!";
  } else {
    $address = $input_address;
  }

  //Check input errors before inserting in db
  if (empty($name_err) && empty($address_err) && empty($salary_err)) {
    //Prepare an insert statement
    $sql = "INSERT INTO employees(name, address, salary) VALUE (?, ? , ?)";

    //set parameters
    $param_name = $name;
    $param_address = $address;
    $param_salary = $salary;

    if($stmt = mysqli_prepare($link, $sql)) {
      //Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param($stmt, "sss", $param_name, $param_address, $param_salary);

      if(mysqli_stmt_execute($stmt)) {
        //records created successfully. Redirect to landing page
        header("location: index.php");
        exit();
      } else {
        echo "Something went wrong. Please try again later!";
      }
    }

    //close statement
    mysqli_stmt_close($stmt);
  }

  //Close connection
  mysqli_close($link);
}
?>
