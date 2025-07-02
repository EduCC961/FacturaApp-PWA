import {
  obtenerFacturasGuardadas,
  renderSelectFacturas,
} from "../helpers/facturasGuardadas.js";
import { clientes, productos } from "../data.js";

// Inicializa la sección de facturas guardadas y configura el evento de cambio del selector
export function inicializarFacturasGuardadas() {
  const select = document.getElementById("factura-select");
  const detalle = document.getElementById("factura-detalle");
  renderSelectFacturas(select); // Llena el selector con las facturas guardadas

  // Cuando el usuario selecciona una factura, muestra su detalle
  select.onchange = () => {
    mostrarDetalleFactura(detalle, select.value);
  };

  // Si hay facturas, muestra el detalle de la primera por defecto
  if (select.options.length > 0 && select.value !== "") {
    mostrarDetalleFactura(detalle, select.value);
  } else {
    detalle.innerHTML = "";
  }
}

// Muestra el detalle de una factura seleccionada en el área correspondiente
export function mostrarDetalleFactura(detalleElement, idx) {
  const facturas = obtenerFacturasGuardadas();
  const factura = facturas[idx];
  if (!factura) {
    detalleElement.innerHTML = "";
    return;
  }
  // Busca el cliente por ID para mostrar su nombre
  const cliente = clientes.find((c) => c.id === factura.clienteId);
  // Genera el HTML de los productos de la factura, mostrando nombre y subtotal
  const productosHTML = factura.productos
    .map((p) => {
      const prod = productos.find((prod) => prod.id === p.idProducto);
      const nombre = prod ? prod.nombre : p.idProducto;
      const precio = prod ? prod.precio : "";
      return "<li>" + nombre + " x" + p.cantidad + " - $" + p.subtotal.toFixed(2) + "</li>";
    })
    .join("");
  // Muestra el detalle completo de la factura en el elemento destino
  detalleElement.innerHTML =
    "<strong>Cliente:</strong>" + (cliente ? cliente.nombre : "Sin cliente") + "<br>" +
    "<strong>Productos:</strong>" +
    "<ul>" +
      productosHTML +
    "</ul>" +
    "<strong>Total:</strong> $" + factura.total.toFixed(2) + "<br>" +
    "<strong>Fecha:</strong> " + factura.fecha
  ;
}
