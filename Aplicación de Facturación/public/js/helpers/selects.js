import { clientes, productos } from "../data.js";

export function actualizarSelectClientes() {
  const select = document.getElementById("cliente-select");
  if (!select) return;
  select.innerHTML = '<option value="">--Seleccione Cliente--</option>' +
    clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join("");
}

export function actualizarSelectProductos() {
  const select = document.getElementById("producto-select");
  if (!select) return;
  select.innerHTML = '<option value="">--Seleccione Producto--</option>' +
    productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("");
}