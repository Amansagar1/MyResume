<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple Router based on URL path
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Check paths relative to script
if (strpos($request_uri, 'resume.php') !== false || strpos($request_uri, 'api/resume') !== false) {
    require_once __DIR__ . '/api/resume.php';
} elseif (strpos($request_uri, 'contact.php') !== false || strpos($request_uri, 'api/contact') !== false) {
    require_once __DIR__ . '/api/contact.php';
} else {
    header("Content-Type: application/json");
    echo json_encode([
        "status" => "online",
        "name" => "K. Aman Sagar Portfolio API",
        "version" => "1.0.0",
        "endpoints" => [
            "GET /api/resume.php" => "Retrieve complete professional resume details",
            "POST /api/contact.php" => "Submit contact messages"
        ]
    ]);
}
