<?php

    if($_POST['accion'] === 'editar'){

        require_once('../funciones/con_db.php');

        $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

        try{

            $stmt = $conn -> prepare("UPDATE contactos SET nombre = ?, empresa = ?, telefono = ? WHERE id = ?");
            $stmt -> bind_param("sssi", $nombre, $empresa, $telefono, $id);
            $stmt -> execute();

            if($stmt -> affected_rows == 1){
                $respuesta = array(
                    'respuesta' => 'correcto'
                );
            } else {
                $respuesta = array(
                    'respuesta' => 'Sin cambios'
                );
            }

            $stmt->close();
            $conn->close();

        } catch(Exception $e){
            $respuesta = array(
                'error' => $e -> getMessage()
            );
        }

        echo json_encode($respuesta);
    }

?>