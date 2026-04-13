<<<<<<< HEAD
<?php
$servername = "localhost";
$username = "root";
$password = ""; // leave empty if you didn’t set one
$database = "DisasterReliefManagement";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
=======
<?php
$servername = "localhost";
$username = "root";
$password = ""; // leave empty if you didn’t set one
$database = "DisasterReliefManagement";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
