<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Read JSON data from the file
    $filePath = $_SERVER['DOCUMENT_ROOT'] . '/datosTabla.json';
    $jsonData = file_get_contents($filePath);
    $data = json_decode($jsonData, true);

    // Check if the data was read correctly
    if ($data === null) {
        echo json_encode(array("error" => "Failed to read JSON data."));
        exit();
    }

    // Pagination parameters
    $itemsPerPage = isset($_GET['itemsPerPage']) ? (int)$_GET['itemsPerPage'] : 10;
    $currentPage = isset($_GET['page']) ? (int)$_GET['page'] : 1;

    // Calculate total number of pages
    $totalItems = count($data);
    $totalPages = ceil($totalItems / $itemsPerPage);

    // Calculate the starting index of items for the current page
    $startIndex = ($currentPage - 1) * $itemsPerPage;

    // Extract the items for the current page
    $paginatedData = array_slice($data, $startIndex, $itemsPerPage);

    // Return paginated data along with pagination information
    $response = array(
        "currentPage" => $currentPage,
        "itemsPerPage" => $itemsPerPage,
        "totalItems" => $totalItems,
        "totalPages" => $totalPages,
        "data" => $paginatedData
    );

    echo json_encode($response);
} else {
    echo json_encode(array("error" => "Invalid request method."));
}
?>
