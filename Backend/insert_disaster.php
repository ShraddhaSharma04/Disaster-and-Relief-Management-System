<?php
header("Content-Type: application/json");
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data
    $DisasterName = $_POST['DisasterName'];
    $DisasterType = $_POST['DisasterType'];
    $Severity = $_POST['Severity'];
    $Date = $_POST['Date'];
    $CountryName = $_POST['CountryName'];
    $State = $_POST['State'];
    $City = $_POST['City'];
    $Deaths = $_POST['Deaths'] ?? 0;
    $Injured = $_POST['Injured'] ?? 0;
    $Homeless = $_POST['Homeless'] ?? 0;
    $TotalDamage_USD = $_POST['TotalDamage_USD'] ?? 0;

    // Insert into your table
    $sql = "INSERT INTO disaster_records 
        (DisasterID, DisasterName, DisasterType, Severity, Date, CountryName, State, City, Deaths, Injured, Homeless, TotalDamage_USD)
        VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssssssiiid",
        $DisasterName,
        $DisasterType,
        $Severity,
        $Date,
        $CountryName,
        $State,
        $City,
        $Deaths,
        $Injured,
        $Homeless,
        $TotalDamage_USD
    );

    if ($stmt->execute()) {
        echo json_encode(["message" => "Disaster record inserted successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
