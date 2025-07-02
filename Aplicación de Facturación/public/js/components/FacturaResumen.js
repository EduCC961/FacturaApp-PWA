import { facturaActual, productos } from "../data.js";

// Define el componente personalizado para mostrar el resumen de la factura actual
class FacturaResumen extends HTMLElement {
  // Se llama cuando el elemento se agrega al DOM
  connectedCallback() {
    this.render();
  }
  // Renderiza el resumen de la factura en el HTML del componente
  render() {
    // Si no hay productos en la factura, muestra un mensaje
    if (facturaActual.productos.length === 0) {
      this.innerHTML = "<h3>Factura</h3><p>No hay productos agregados.</p>";
      return;
    }
    // Genera el HTML de los productos agregados a la factura
    const itemsHTML = facturaActual.productos
      .map((item) => {
        const prod = productos.find((p) => p.id === item.idProducto);
        // Muestra el nombre, cantidad y subtotal de cada producto
        return prod
          ? "<p>" + prod.nombre + " x " + item.cantidad + " = $" + item.subtotal.toFixed(2) + "</p>"
          : "";
      })
      .join("");
    // Muestra el resumen completo con el total
    this.innerHTML = `<h3>Factura</h3>${itemsHTML}<strong>Total: $${facturaActual.total.toFixed(
      2
    )}</strong>`;
  }
}
// Registra el componente personalizado para poder usar <factura-resumen> en HTML
customElements.define("factura-resumen", FacturaResumen);
