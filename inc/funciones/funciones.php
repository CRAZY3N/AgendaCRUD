<!-- Consulta a la base de datos, para mostrar los registros en la pagina -->
<?php

    //Consulta de todos los campos de la tabla de contactos
function obtenerRegistros(){
    include 'con_db.php';
    try{
        //Regresar todas las consultas 
        return $conn->query("SELECT id, nombre, empresa, telefono FROM contactos");
    } catch(Exception $e){
        $respuesta = array(
            'error' => $e->getMessage()
        );
        echo "Error" . $e->getMessage() . "<br>";
        return false;
    }
}

?>