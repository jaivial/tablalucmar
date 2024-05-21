<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $query = $_POST["query"];

    echo "La dirección ingresada es: " . $query;
}
else {
    echo "El formulario no ha sido enviado.";
}
?>
