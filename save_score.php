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

// Check if the user exists or create a new user
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    $stmt = $pdo->prepare("INSERT INTO users (username) VALUES (?)");
    $stmt->execute([$username]);
    $userId = $pdo->lastInsertId();
} else {
    $userId = $user['id'];
}

// Insert the score into the database
$sql = "INSERT INTO scores (user_id, score) VALUES (?, ?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$userId, $score]);

// Return a response if needed
$response = ['message' => 'Score saved successfully'];
echo json_encode($response);
?>
