<div class="g g-3 gp">
    <div class="campo">
        <label for="nombre">Nombre:<span>*</span></label>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre Contacto" require>
    </div>
    <div class="campo">
        <label for="empresa">Empresa:<span>*</span></label>
        <input type="text" name="empresa" id="empresa" placeholder="Empresa" require>
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:<span>*</span></label>
        <input type="tel" name="telefono" id="telefono" placeholder="Ingresa el número" require>
    </div>
</div>
<div class="campo enviar">
    <input type="hidden" id="accion" value="crear" name="crear">
    <input type="submit" value="Añadir">
</div>
<div class="error" id="error"></div>