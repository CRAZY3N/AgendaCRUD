<?php
    /* Archivo para crear o insertar nuevo elemento a la tabla */

    if($_POST['accion'] == 'crear' ){
        //Se creara un nuevo registro en la base de datos
        require_once('../funciones/con_db.php');
        
        /* Validar entradas */
        //Con filter_var y FILTER_SANITIZE_STRING, confirmamos recibir un string
        $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
        $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
        $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);

        try {
            //Preparamos para la inserción a la BD
            $stmt = $conn -> prepare("INSERT INTO contactos (nombre, empresa, telefono) VALUES (?, ?, ?)"); /* Se prepara la inserción, para prevenir injección SQL */
            //Decimos que tipo de datos y cuantos datos se enviaran, y los envíamos
            $stmt -> bind_param("sss", $nombre, $empresa, $telefono); /* Definimos los tipos de datos a ingresar y los valores */
            //Ejecutamos la inserción
            $stmt -> execute(); /* Ejecutamos  */

            //Una vez que se ejecute, obtenemos los dados
            if($stmt->affected_rows === 1){
                //Guardamos los datos para obtenerlos y poder seguir trabajando con ellos
                $respuesta = array(
                    //Indicamos una respuesta de correcto
                    'respuesta' => 'correcto',
                    'info' => $stmt-> affected_rows, //Saber si hubo cambios en las filas (registros)
                    'datos' => array( //Retornamos los valores insertados
                        'id_insertado' => $stmt -> insert_id, //El Id
                        'nombre' => $nombre, //Nombre
                        'empresa' => $empresa, //Empresa
                        'telefono' => $telefono //Teléfono
                    )
                );
            }

            $stmt -> close(); //Cerramos el statement
            $conn-> close(); //Cerramos la conexión
        } catch(Exception $e){ //En caso de un error
            $respuesta = array(
                'error'=> $e->getMessage()
            );
        }     

        echo json_encode($respuesta); //Retorno los datos de respuesta
    }

    

?>