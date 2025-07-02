import { productos } from "../data.js";

// Define el componente personalizado para mostrar la lista de productos
class ProductoList extends HTMLElement {
  // Se llama cuando el elemento se agrega al DOM
  connectedCallback() {
    this.render();
  }
  // Renderiza la lista de productos en el HTML del componente
  render() {
    this.innerHTML =
      productos.length === 0
        ? // Si no hay productos, muestra un mensaje
          "<h3>Productos Registrados:</h3><p>No hay productos registrados.</p>"
        : // Si hay productos, los muestra en una lista
          `<h3>Productos Registrados:</h3>` +
          productos
            .map(
              (p) =>
                "<p>" + p.nombre + " (Código: " + p.id + ") - $" + p.precio.toFixed(2) + "</p>"
            )
            .join("");
  }
}
// Registra el componente personalizado para poder usar <producto-list> en HTML
customElements.define("producto-list", ProductoList);
