import { productos, facturaActual, facturas } from "../data.js";
import { limpiarCantidadProductoFactura } from "../helpers/limpiarCampos.js";
import { renderSelectFacturas } from "../helpers/facturasGuardadas.js";
import { mostrarDetalleFactura } from "./facturasGuardadas.js";

// Agrega un producto a la factura actual
export function agregarProductoAFactura() {
  const productoId = document.getElementById("producto-select").value;
  const cantidad = parseInt(document.getElementById("producto-cantidad").value);

  // Validaciones de selección y cantidad
  if (!productoId) {
    alert("Selecciona un producto para agregar.");
    return;
  }
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingresa una cantidad válida mayor a cero.");
    return;
  }

  // Busca el producto en la lista de productos
  const producto = productos.find((p) => p.id === productoId);
  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }

  // Si el producto ya está en la factura, suma la cantidad y actualiza el subtotal
  const productoEnFactura = facturaActual.productos.find(
    (p) => p.idProducto === productoId
  );
  if (productoEnFactura) {
    productoEnFactura.cantidad += cantidad;
    productoEnFactura.subtotal = productoEnFactura.cantidad * producto.precio;
  } else {
    // Si no está, lo agrega como nuevo producto en la factura
    facturaActual.productos.push({
      idProducto: productoId,
      cantidad,
      subtotal: cantidad * producto.precio,
    });
  }

  // Actualiza el total de la factura
  // Calcula y actualiza el total de la factura sumando los subtotales de todos los productos.
  // Recorre todo el arreglo y se va sumando los subtotales de cada producto en el acumulador.
  facturaActual.total = facturaActual.productos.reduce(
    (acc, p) => acc + p.subtotal,
    0
  );

  // Actualiza el resumen de la factura en pantalla
  document.querySelector("factura-resumen").render();
  limpiarCantidadProductoFactura();
}

// Guarda la factura actual en el localStorage y actualiza la UI
export function guardarFactura() {
  const clienteId = document.getElementById("cliente-select").value;

  // Validaciones de cliente y productos en la factura
  if (!clienteId) {
    alert("Selecciona un cliente para la factura.");
    return;
  }
  if (facturaActual.productos.length === 0) {
    alert("Agrega al menos un producto a la factura.");
    return;
  }

  // Crea el objeto factura con los datos actuales
  const factura = {
    id: Date.now().toString(),
    clienteId,
    productos: facturaActual.productos,
    total: facturaActual.total,
    fecha: new Date().toISOString().split("T")[0],
  };

  // Agrega la factura al array y la guarda en localStorage
  facturas.push(factura);
  localStorage.setItem("facturas", JSON.stringify(facturas));

  // Recarga el selector de facturas guardadas y muestra el detalle de la última
  const select = document.getElementById("factura-select");
  const detalle = document.getElementById("factura-detalle");
  renderSelectFacturas(select);
  // Selecciona la última factura agregada
  select.value = (facturas.length - 1).toString();
  mostrarDetalleFactura(detalle, select.value);

  alert("Factura guardada correctamente.");

  // Limpia la factura actual y actualiza el resumen en pantalla
  facturaActual.productos = [];
  facturaActual.total = 0;
  document.querySelector("factura-resumen").render();

  // Limpia la selección de cliente
  document.getElementById("cliente-select").value = "";
}
