<!-- Header -->
<?php include 'inc/layout/header.php'; 
      include 'inc/funciones/mActualizar.php'; ?>

<!-- <pre> -->
<?php
$id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    if(!$id){
        die('No es valido');
}
    $resultado = obteContacto($id);
    $contacto = $resultado -> fetch_assoc();
/* var_dump($id); */ /* Validar lo que se está recibiendo */
?>
<!-- </pre> -->

<!-- <pre> -->
    <?php /* var_dump($contacto); */ ?>
<!-- </pre> -->

<!-- Barra -->
<div class="barra bEditar">
    <a href="index.php" class="btn btn-volver">Volver</a>
    <h1 class="tc tb">Editar de Contacto</h1>
</div>

<div class="contenedor sombra">
    <div class="pEditar">
    <form action="#" class="formEditar" id="contacto">
        <legend class="tc tb">Edite el contacto <span></span></legend>

        <!-- formulario -->
        <?php include'inc/layout/formulario.php' ?>

    </form>
    </div>
</div>


<!-- Footer -->
<?php include 'inc/layout/footer.php'; ?>