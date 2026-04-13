<?php
include 'db_connect.php';

if (isset($_GET['query'])) {
    $query = $_GET['query'];
    $sql = "SELECT * FROM disaster_records WHERE DisasterName LIKE '%$query%' LIMIT 10";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<table border='1' cellpadding='8'>";
        echo "<tr><th>Disaster Name</th><th>Type</th><th>Date</th><th>Location</th><th>Severity</th></tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>{$row['DisasterName']}</td>
                    <td>{$row['DisasterType']}</td>
                    <td>{$row['Date']}</td>
                    <td>{$row['City']}, {$row['State']}, {$row['CountryName']}</td>
                    <td>{$row['Severity']}</td>
                  </tr>";
        }
        echo "</table>";
    } else {
        echo "No records found.";
    }
}
$conn->close();
?>
