<?php
// Connect to the database
$host = 'localhost';
$dbname = 'project_xxx';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}

// Get the data from the AJAX request
$data = json_decode(file_get_contents('php://input'));

$username = $data->username;
$score = $data->score;

// Insert the score into the database
$sql = "INSERT INTO scores (username, score) VALUES (?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$username, $score]);

// Return a response if needed
$response = ['message' => 'Score saved successfully'];
echo json_encode($response);
?>
