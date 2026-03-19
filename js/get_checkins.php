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

// Query all check-ins
$result = $conn->query("SELECT * FROM checkins ORDER BY created_at DESC");

// Collect results
$entries = [];
while($row = $result->fetch_assoc()) {
  $entries[] = $row;
}
$conn->close();

// Return as JSON
header('Content-Type: application/json');
echo json_encode($entries);
?>
