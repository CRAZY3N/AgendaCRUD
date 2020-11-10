'use strict';

window.addEventListener('load',function(){
   
    /* div error */
    var error = document.querySelector("#error");

    /* Campos de formulario */
    var nombre = document.querySelector("#nombre");
    var empresa = document.querySelector("#empresa");
    var telefono = document.querySelector("#telefono");

    /* Llamado de funciones */
    nombre.addEventListener('blur', validar);
    empresa.addEventListener('blur', validar);
    telefono.addEventListener('blur', validar);

    /* Validar campos */
    function validar(){
        if(this.value === "" || this.value.trim() === ""){
            error.style.display = "block";
            error.innerHTML = "<p> Campo obligatorio</p>";
            this.style.border = "0.2rem solid #E31E1E";
            this.focus();
        } else {
            error.style.display = "none";
            this.style.border = "0.1rem solid #CCCCCC";

        }
    }

    
});