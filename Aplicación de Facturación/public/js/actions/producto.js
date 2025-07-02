import { productos } from "../data.js";
import { actualizarSelectProductos } from "../helpers/selects.js";
import { limpiarCamposProducto } from "../helpers/limpiarCampos.js";

// Función para agregar un nuevo producto
export function agregarProducto() {
  // Obtiene y limpia los valores de los campos del formulario
  const nombre = document.getElementById("producto-nombre").value.trim();
  const codigo = document.getElementById("producto-codigo").value.trim();
  const precio = parseFloat(document.getElementById("producto-precio").value);

  // Valida que todos los campos estén completos y el precio sea válido
  if (!nombre || !codigo || isNaN(precio) || precio < 0) {
    alert(
      "Por favor completa todos los campos del producto con valores válidos."
    );
    return;
  }

  // Verifica si ya existe un producto con el mismo código
  if (productos.some((p) => p.id === codigo)) {
    alert("El producto con este código ya está registrado.");
    return;
  }

  // Crea el objeto producto y lo agrega al array
  const producto = { id: codigo, nombre, precio };
  productos.push(producto);
  // Guarda la lista de productos actualizada en localStorage
  localStorage.setItem("productos", JSON.stringify(productos));

  // Actualiza la lista de productos y el selector en la UI
  document.querySelector("producto-list").render();
  actualizarSelectProductos();
  // Limpia los campos del formulario de producto
  limpiarCamposProducto();
}
