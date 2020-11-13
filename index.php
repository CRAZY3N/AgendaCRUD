<!-- Header -->
<?php include 'inc/layout/header.php'; ?>


<!-- Barra -->
<div class="barra">
    <h1 class="tc tb">Agenda de Contactos</h1>
</div>

<!-- Añadir -->
<div class="contenedor sombra seccion formulario">
    <form id="contacto" action="#">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>

        <!-- formulario -->
        <?php include'inc/layout/formulario.php' ?>

    </form>
</div>
<!-- Fin de añadir -->

<!-- Contactos -->
<div class="contenedor seccion sombra">
    <div class="contactos">
    <h2 class="tc">Contactos</h2>
    <input type="text" name="buscar" class="buscar sombra" id="buscar" placeholder="Buscar contactos...">

    <p class="tc"><span>1</span> Contactos</p>

    <div class="tabla">
        <table id="listadoContactos">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Teléfono</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
                <!-- Estructura de cada columna -->
                <!-- <tr>
                    <td>Emm</td>
                    <td>DD Web</td>
                    <td>55 1234 5678</td>
                    <td>
                        <a class="btn btn-editar" href="editar.php?id=1"><i class="fas fa-pen-square"></i></a>
                        <button data-id="1" class="btn btn-borrar" type="button"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr> -->
           </tbody>
        </table>
    </div>
    </div>

</div>
<!-- Fin Contactos -->

<!-- Footer -->
<?php include 'inc/layout/footer.php'; ?>