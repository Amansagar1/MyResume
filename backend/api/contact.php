<?php
// d:\proj\backend\api\contact.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed. Use POST."]);
    exit();
}

// Get POST input
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please fill in all required fields (Name, Email, Message)."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide a valid email address."]);
    exit();
}

try {
    $manager = getMongoManager();
    $namespace = "portfolio.messages";
    
    $newMessage = [
        "timestamp" => date("Y-m-d H:i:s"),
        "name" => htmlspecialchars($name),
        "email" => htmlspecialchars($email),
        "subject" => htmlspecialchars($subject),
        "message" => htmlspecialchars($message)
    ];

    $bulk = new MongoDB\Driver\BulkWrite;
    $bulk->insert($newMessage);
    $manager->executeBulkWrite($namespace, $bulk);

    echo json_encode([
        "success" => true,
        "message" => "Thank you, your message has been received and saved directly to MongoDB Atlas!",
        "data" => $newMessage
    ]);
} catch (Exception $e) {
    // Fail-safe fallback to local JSON file if MongoDB is offline or drivers are missing
    try {
        $dataDir = __DIR__ . '/../data';
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }
        
        $messagesFile = $dataDir . '/messages.json';
        $messages = [];
        
        if (file_exists($messagesFile)) {
            $fileData = file_get_contents($messagesFile);
            $messages = json_decode($fileData, true) ?? [];
        }
        
        $newMessage = [
            "id" => uniqid(),
            "timestamp" => date("Y-m-d H:i:s"),
            "name" => htmlspecialchars($name),
            "email" => htmlspecialchars($email),
            "subject" => htmlspecialchars($subject),
            "message" => htmlspecialchars($message),
            "storage_fallback" => "local_json"
        ];
        
        $messages[] = $newMessage;
        file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT));
        
        echo json_encode([
            "success" => true,
            "message" => "Thank you, your message has been received! (Stored in local JSON database fallback).",
            "data" => $newMessage
        ]);
    } catch (Exception $fallbackError) {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "message" => "Failed to save message. Mongo Connection Error: " . $e->getMessage()
        ]);
    }
}
