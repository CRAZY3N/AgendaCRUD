<?php
    define('DB_USUARIO', 'root');
    define('DB_PASSWORD', '');
    define('DB_HOST','localhost');
    define('DB_NOMBRE','agendaphp');

    $conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE); /* Un quinto atributo puede ser puerto = DB_PORT  */

    /* echo $conn -> ping(); */ /* Si regresa un 1, la conexión fue exitosa */
?>