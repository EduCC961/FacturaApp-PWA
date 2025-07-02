import { clientes } from "../data.js";

// Define el componente personalizado para mostrar la lista de clientes
class ClienteList extends HTMLElement {
  // Se llama cuando el elemento se agrega al DOM
  connectedCallback() {
    this.render();
  }
  // Renderiza la lista de clientes en el HTML del componente
  render() {
    this.innerHTML =
      clientes.length === 0
        ? // Si no hay clientes, muestra un mensaje
          "<h3>Clientes Registrados:</h3><p>No hay clientes registrados.</p>"
        : // Si hay clientes, los muestra en una lista
          `<h3>Clientes Registrados:</h3>` +
          clientes
            .map((c) => "<p>" + c.nombre + " (" + c.cedula + ") - " + c.direccion + "</p>")
            .join("");
  }
}
// Registra el componente personalizado para poder usar <cliente-list> en HTML
customElements.define("cliente-list", ClienteList);
