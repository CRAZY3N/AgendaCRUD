<?php

    if($_POST['accion'] == 'crear' ){
        //Se creara un nuevo registro en la base de datos
        require_once('../funciones/con_db.php');
        
        /* Validar entradas */
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

        try {
            $stmt = $conn -> prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)"); /* Se prepara la inserción, para prevenir injección SQL */
            $stmt -> bind_param("sss", $nombre, $empresa, $telefono); /* Definimos los tipos de datos a ingresar y los valores */
            $stmt -> execute(); /* Ejecutamos  */

            if($stmt->affected_rows === 1){
                $respuesta = array(
                    'respuesta' => 'correcto',
                    'info' => $stmt->affected_rows 
                );
            }

            $stmt -> close();
            $conn-> close();
        } catch(Exception $e){
            $respuesta = array(
                'error'=> $e->getMessage()
            );
        }     


        echo json_encode($_POST);
    }

    

?>