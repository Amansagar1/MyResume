<?php
header("Content-Type: application/json");
echo json_encode(get_loaded_extensions());
