import { clientes } from "../data.js"; // Importa la lista de clientes

// Obtiene las facturas guardadas desde localStorage
export function obtenerFacturasGuardadas() {
  return JSON.parse(localStorage.getItem("facturas")) || [];
}

// Llena el <select> de facturas guardadas con el nombre del cliente correspondiente
export function renderSelectFacturas(selectElement) {
  const facturas = obtenerFacturasGuardadas();
  selectElement.innerHTML = "";
  if (facturas.length === 0) {
    // Si no hay facturas, muestra un mensaje en el selector
    selectElement.innerHTML =
      "<option value=''>No hay facturas guardadas</option>";
    return;
  }

  // Recorre cada factura y agrega una opción al selector con el nombre del cliente
  facturas.forEach((factura, idx) => {
    // Buscar el cliente por ID
    const clienteObj = clientes.find((c) => c.id === factura.clienteId);
    const clienteNombre = clienteObj ? clienteObj.nombre : "Sin cliente";
    selectElement.innerHTML += `<option value="${idx}">Factura #${
      idx + 1
    } - ${clienteNombre}</option>`;
  });
}
