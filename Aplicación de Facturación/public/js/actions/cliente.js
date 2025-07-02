import { clientes } from "../data.js";
import { actualizarSelectClientes } from "../helpers/selects.js";
import { limpiarCamposCliente } from "../helpers/limpiarCampos.js";

// Función para agregar un nuevo cliente
export function agregarCliente() {
  // Obtiene y limpia los valores de los campos del formulario
  const nombre = document.getElementById("cliente-nombre").value.trim();
  const cedula = document.getElementById("cliente-cedula").value.trim();
  const direccion = document.getElementById("cliente-direccion").value.trim();

  // Valida que todos los campos estén completos
  if (!nombre || !cedula || !direccion) {
    alert("Por favor completa todos los campos del cliente.");
    return;
  }

  // Verifica si ya existe un cliente con la misma cédula
  if (clientes.some((c) => c.cedula === cedula)) {
    alert("El cliente con esta cédula ya está registrado.");
    return;
  }

  // Crea el objeto cliente con un ID único
  const cliente = {
    id: Date.now().toString(),
    nombre,
    cedula,
    direccion,
  };

  // Agrega el cliente al array y lo guarda en localStorage
  clientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));

  // Actualiza la lista de clientes y el selector en la UI
  document.querySelector("cliente-list").render();
  actualizarSelectClientes();

  // Limpia los campos del formulario de cliente
  limpiarCamposCliente();
}
