<<<<<<< HEAD
<?php
include 'db_connect.php';

$sql = "SELECT DisasterType, COUNT(*) as Total, SUM(Deaths) as TotalDeaths, SUM(TotalDamage_USD) as Damage
        FROM disaster_records GROUP BY DisasterType";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
=======
<?php
include 'db_connect.php';

$sql = "SELECT DisasterType, COUNT(*) as Total, SUM(Deaths) as TotalDeaths, SUM(TotalDamage_USD) as Damage
        FROM disaster_records GROUP BY DisasterType";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
>>>>>>> 20a75fbeb2859c4cd17c73b82a1176f28adae41e
