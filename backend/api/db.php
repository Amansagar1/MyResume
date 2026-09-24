<?php
// d:\proj\backend\api\db.php

/**
 * Returns a MongoDB Driver Manager instance.
 * Handles credentials and checks if the mongodb extension is active.
 */
function getMongoManager() {
    // Read from environment variable if set, otherwise fallback to default
    $envUri = getenv('MONGODB_URI') ?: ($_ENV['MONGODB_URI'] ?? null);
    $uri = !empty($envUri) ? $envUri : "mongodb+srv://sagarsharmaofficial0_db_user:%40Developer%400531@cluster0.fqyxfx6.mongodb.net/";
    
    if (!extension_loaded('mongodb')) {
        throw new Exception("The 'mongodb' PHP extension is not loaded. Please enable 'extension=mongodb' in your php.ini configuration.");
    }
    
    return new MongoDB\Driver\Manager($uri);
}
