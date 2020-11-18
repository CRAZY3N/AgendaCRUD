'use strict'

      /* Index  formulario*/
const formularioContactos = document.querySelector("#contacto"),
       /* index Todos los contactos en la BD */
      listadoContactos = document.querySelector('#listadoContactos tbody'),
      /* Buscador de index */
      inputBuscador = document.querySelector('#buscar');

addEventListener();

            /* Eventos addEventListener */
function addEventListener(){
    /* Cuando el formulario de crear o editar se ejecuta */
    formularioContactos.addEventListener('submit', leerFormulario);   

    //Listado para eliminar el botón
    if(listadoContactos){ /* Para evitar que genere un error en otras paginas que no sea index */
        listadoContactos.addEventListener('click', eliminarContacto);
    }
    //Buscador de index
    if(inputBuscador){
        inputBuscador.addEventListener('input',buscarContacto);
    }

    /* Mostrar registros tr tbody */
    numeroContactos();
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

        if(accion === 'crear'){
            /* Crear nuevo contacto */
            insertarBD(infoContacto);
        } else {
            /* Modificar contacto */
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id',idRegistro);
            modificarBD(infoContacto);
        }
    }
}

/* Función buscar Contacto */
function buscarContacto(e){
    /* Comprobar que esta leyendo el valor */
    /* console.log(e.target.value); */
    const expresion = new RegExp(e.target.value, "i"),  /* ."i" convierte todo a minúsculas para poder buscar con mayúsculas y minúsculas */
          registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';
        /* console.log(registro.childNodes[1], registro.childNodes[3], registro.childNodes[5]); */ /* Obtener todos los campos en la tabla, nombre, empresa, telefono */
        if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){ /*/\s/g carácter de espacio, sustituido por espacio, por compatibilidad  */
            registro.style.display = 'table-row';
        }
        numeroContactos();
    });

}

/* Número de contactos */
function numeroContactos(){
    const totalContactos = document.querySelectorAll('tbody tr'),
          contenedorNumero = document.querySelector('#conContactos');
    ;
    let total = 0;
    totalContactos.forEach(contacto => {
        if(contacto.style.display === '' || contacto.style.display === 'table-row'){
            total++;
        }
    });
    contenedorNumero.textContent = total;
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
            
            /* Actualizar números visibles */
            numeroContactos();
            /* Notificación de guardado y agregado */
            mostrarNotificacion('Guardado Exitosamente', 'nCorrecto');
        }
    }
    //Enviar datos
    xhr.send(info);
}

/* Función de Modificar en Base de Datos */
function modificarBD(info){
    /* console.log("Modificar", ...info); */
    /* Pasar los datos, Crear el objeto */
    const xhr = new XMLHttpRequest();
    /* abrir la conexión  */
    xhr.open('POST','inc/modelos/modelo-actualizar.php' , true);
    /* Leer la respuesta */
    xhr.onload = function(){
        if(this.status === 200){
            const respuesta = JSON.parse(xhr.responseText);
            if(respuesta.respuesta === 'correcto'){
                /* Mostrar notificación */
                mostrarNotificacion('Actualizado correctamente','nCorrecto');
            } else {
                /* Mostrar notificación */
                mostrarNotificacion('Hubo un error','nError');
            }
            /* Después de 3 seg redireccionar a index */
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 3000);
        }
    }
    /* Enviar la petición */
    xhr.send(info);

}

/* Función para eliminar contacto */
function eliminarContacto(e) { /* e Nos dira a que elemento le dimos click  */
    /* console.log(e.target.parentElement.classList.contains('btn-borrar')); */ /* Nos dirá a que le dimos click */
    /* Con e.target.parentElement.classList.contains('btn-borrar'), nos dirá si el elemento que le dimos click tiene la clase btn-borrar */
    if(e.target.parentElement.classList.contains('btn-borrar')){
        /* console.log("Comprobanos que solo reaccione al dar click al botón de eliminar"); */
        //Tomar el ID del elemento
        const id = e.target.parentElement.getAttribute('data-id');
        /* console.log(id); */ /* Comprobar que obtenemos el ID */
        //Confirmar si están seguros de eliminar
        const confirma = confirm('¿Estás seguro (a) de eliminar el registro?');

        if(confirma){
            /* console.log("Borrar"); */ //COnfirmar que se recibe la respuesta
            //Llamado al ajax
            //Crear el objeto
            const xhr = new XMLHttpRequest();
            //Abrir la conexión
            xhr.open('GET', `inc/modelos/modelo-borrar.php?id=${id}&accion=borrar`, true);
            //Leer la respuesta
            xhr.onload = function() {
                if(this.status === 200) {
                    const resul = JSON.parse(xhr.responseText);
                    /* console.log(resul); */ /* Comprobar lo que regresa */
                    if(resul.respuesta === 'correcto'){
                        /* Eliminar del DOM */
                        /* console.log(e.target.parentElement.parentElement.parentElement); */ /*Saber el elemento a borrar (button, td, tr) */
                        e.target.parentElement.parentElement.parentElement.remove();
                        /* Actualizar números visibles */
                        numeroContactos();
                        /* Mostrar notificación */
                        mostrarNotificacion('Eliminado correctamente','nCorrecto');
                    } else {
                        mostrarNotificacion('Hubo un error', 'nError');
                    }
                }
            };
            //Enviar la petición
            xhr.send();
        }

    }

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
