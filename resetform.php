<?php
header('Content-Type: application/json');


    // Database information
    $host = "srv747.hstgr.io";
    $port = "3306";
    $user = "u212050690_Jaivial";
    $password = "Jva_Mvc_5171";
    $database = "u212050690_Astrodatabase";

    // Attempt database connection
    try {
        // PDO database connection
        $dsn = "mysql:host=$host;port=$port;dbname=$database";
        $pdo = new PDO($dsn, $user, $password);

        // Set PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare SQL statement
        $sql = "SELECT id, direccion, tipo, uso, superficie, ano_construccion FROM inmuebles";
        $stmt = $pdo->prepare($sql);
        
      
        
        // Execute the statement
        $stmt->execute();

        // Fetch the results
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Close the database connection
        $pdo = null;

        // Encode the results as JSON
        $jsonResults = json_encode($results);

        // Define the file path
        $filePath = $_SERVER['DOCUMENT_ROOT'] . '/datosTabla.json';

        // Attempt to write the JSON data to the file
        if (file_put_contents($filePath, $jsonResults) === false) {
            echo json_encode(array("error" => "Failed to write to file."));
        } else {
            header('Location: /');
exit;
        }
    } catch (PDOException $e) {
        // Display error message if connection or query fails
        echo json_encode(array("error" => $e->getMessage()));
    }


?>
