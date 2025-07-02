// Limpia los campos del formulario de cliente
export function limpiarCamposCliente() {
  document.getElementById("cliente-nombre").value = "";
  document.getElementById("cliente-cedula").value = "";
  document.getElementById("cliente-direccion").value = "";
}

// Limpia los campos del formulario de producto
export function limpiarCamposProducto() {
  document.getElementById("producto-nombre").value = "";
  document.getElementById("producto-codigo").value = "";
  document.getElementById("producto-precio").value = "";
}

// Limpia la cantidad y el selector de producto en la sección de factura
export function limpiarCantidadProductoFactura() {
  document.getElementById("producto-cantidad").value = "";
  document.getElementById("producto-select").value = "";
}
