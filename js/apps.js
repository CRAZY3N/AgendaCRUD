'use strict'

const formularioContactos = document.querySelector("#contacto"),
      listadoContactos = document.querySelector('#listadoContactos tbody');

addEventListener();

function addEventListener(){
    /* Cuando el formulario de crear o editar se ejecuta */
    formularioContactos.addEventListener('submit', leerFormulario);   
}

function leerFormulario(e){
    e.preventDefault(); /* Evitar que recarge o redireccione  */
    /* Tomar los valores de los datos */
    const nombre = document.querySelector("#nombre").value,
          empresa = document.querySelector("#empresa").value,
          telefono = document.querySelector("#telefono").value,
          accion = document.querySelector('#accion').value;

    if(nombre === '' || empresa === '' || telefono === ''){
        mostrarNotificacion('Todos los campos son obligatorios', 'nError');
    } else {
        //Pasa la validación, crear llamado de Ajax
        const infoContacto = new FormData();  /* Leer datos de un formulario, y poder utilizar ajax */
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);
        
        /* console.log(...infoContacto); */ /* Crea copia de la variable para poder ver su contenido */

        if(accion == 'crear'){
            /* Crear nuevo contacto */
            insertarBD(infoContacto);
        } else {
            /* Modificar contacto */
            modificarBD(infoContacto);
        }
    }
}

/* Función de Insertar en Base de Datos via Ajax */
function insertarBD(info){
    /* console.log("Modificar", ...info); */
    //Llamado al ajax

    //Crear Objeto
    const xhr = new XMLHttpRequest();
                                                /* xhr.onreadystatechange = function () {
                                                    if(xhr.readyState === 4){
                                                        if(xhr.status === 200) {
                                                            console.log(xhr.responseText);
                                                        } else {
                                                            console.log("Error Code: ", xhr.status );
                                                            console.log("Error message: ", xhr.statusText);
                                                        }
                                                    }
                                                }
                                                xhr.open('POST', 'inc/modelos/modelo-contactos.php');
                                                xhr.send(info); */
        
    //Abrir la conexión
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true); //Post para enviar, Get para solicitar
    //Pasar los datos
    xhr.onload = function(){
        if(this.status === 200){
            /* console.log(JSON.parse(xhr.responseText)); */
            //Leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);
            //console.log(respuesta);
            //Insertar nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;
            //Contenedor botones
            const contenedor = document.createElement('td');
            
            //Icono de editar
            const iconoEditar = document.createElement('i'); //Elemento i
            iconoEditar.classList.add('fas','fa-pen-square');
            //Crear enlace para editar
            const btnEditar = document.createElement('a'); //El elemento a
            btnEditar.appendChild(iconoEditar); //Agregamos a al elemento i
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn','btn-editar'); //Agrega clases para el botón

            //Icono de eliminar
            const iconoBorrar = document.createElement('i');
            iconoBorrar.classList.add('fas','fa-trash-alt');
            //Crear enlace para borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.appendChild(iconoBorrar);
            btnBorrar.classList.add('btn','btn-borrar');
            btnBorrar.setAttribute('data-id', respuesta.datos.id_insertado);

            //Agregar al contenedor los botones
            contenedor.appendChild(btnEditar); //Agregamos el botón editar al contenedor
            contenedor.appendChild(btnBorrar); //Agregamos el botón de borrar al contenedor

            //Agregar el contenedor al tr
            nuevoContacto.appendChild(contenedor); //Agregamos el contenedor (botones) al tr de la tabla

            //Agregarlo a la tabla
            listadoContactos.appendChild(nuevoContacto); //Agregamos todo el contenido a la tabla de la pagina

            //Limpiar campos
            document.querySelector("#nombre").value = '';
            document.querySelector("#empresa").value = '';
            document.querySelector("#telefono").value = '';
            
            /* Notificación de guardado y agregado */
            mostrarNotificacion('Guardado Exitosamente', 'nCorrecto');

            //Resetear campos


        }
    }
    //Enviar datos
    xhr.send(info);
}

/* Función de Modificar en Base de Datos */
function modificarBD(info){
    console.log("Modificar", ...info);
}


/* Notificación en pantalla */
function mostrarNotificacion(mensaje, clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion','sombra', clase);
    notificacion.textContent = mensaje;

    /* Formulario */
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    /* Mostrar y Ocultar notificación */
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(()=>{
                notificacion.remove();
            }, 300);
        }, 3000);
    }, 100);

}
