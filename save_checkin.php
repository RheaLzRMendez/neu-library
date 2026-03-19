<?php
// Database connection
$host = "localhost";
$user = "root";   // default XAMPP MySQL user
$pass = "";       // default password is empty
$db   = "neu_library"; // database you created in phpMyAdmin

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get form data from checkin.html
$purpose = $_POST['purpose'];
$college = $_POST['college'];

// Insert into database
$stmt = $conn->prepare("INSERT INTO checkins (purpose, college) VALUES (?, ?)");
$stmt->bind_param("ss", $purpose, $college);
$stmt->execute();

$stmt->close();
$conn->close();

// Response back to frontend
echo "success";
?>
