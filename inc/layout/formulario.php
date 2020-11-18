
<div class="g g-3 gp">
    <div class="campo">
        <label for="nombre">Nombre:<span>*</span></label>
        <input type="text" name="nombre" id="nombre" value="<?php echo (isset($contacto['nombre'])) ? $contacto['nombre'] :''; ?>" placeholder="Nombre Contacto" require>
    </div>
    <div class="campo">
        <label for="empresa">Empresa:<span>*</span></label>
        <input type="text" name="empresa" id="empresa" value="<?php echo (isset($contacto['empresa'])) ? $contacto['empresa'] : ''; ?>" placeholder="Empresa" require>
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:<span>*</span></label>
        <input type="tel" name="telefono" id="telefono" value="<?php echo (isset($contacto['telefono'])) ? $contacto['telefono'] : ''; ?>" placeholder="Ingresa el número" require>
    </div>
</div>
<div class="campo enviar">
    <?php
        $accion = (isset($contacto)) ? 'editar' : 'crear';
    ?>

    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id'])) { ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php } ?>
    <input type="submit" value=" <?php echo (isset($contacto)) ? "Actualizar" : "Añadir"; ?> ">
</div>
<div class="error" id="error"></div>