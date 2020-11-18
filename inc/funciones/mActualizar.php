<?php

    function obteContacto($id){
        require_once('con_db.php');
        try{
            return $conn ->query ("SELECT id, nombre, empresa, telefono FROM contactos WHERE id = $id");
        }  catch(Exception $e) {
            echo "Error" . $e -> getMesasage() . "<br>";
            return false;
        }
    }

?>