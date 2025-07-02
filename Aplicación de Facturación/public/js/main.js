// Importa los módulos de datos y componentes personalizados
import "./data.js";
import "./components/ClienteList.js";
import "./components/ProductoList.js";
import "./components/FacturaResumen.js";

// Importa las funciones de acciones para clientes, productos y facturas
import { agregarCliente } from "./actions/cliente.js";
import { agregarProducto } from "./actions/producto.js";
import { agregarProductoAFactura, guardarFactura } from "./actions/factura.js";
import { inicializarFacturasGuardadas } from "./actions/facturasGuardadas.js";
import {
  actualizarSelectClientes,
  actualizarSelectProductos,
} from "./helpers/selects.js";

// Asigna eventos a los botones para agregar clientes, productos y facturas
document
  .getElementById("btn-agregar-cliente")
  .addEventListener("click", agregarCliente);

document
  .getElementById("btn-agregar-producto")
  .addEventListener("click", agregarProducto);

document
  .getElementById("btn-agregar-producto-factura")
  .addEventListener("click", agregarProductoAFactura);

document
  .getElementById("btn-guardar-factura")
  .addEventListener("click", guardarFactura);

// Inicializa los selectores y componentes personalizados al cargar la página
actualizarSelectClientes();
actualizarSelectProductos();
document.querySelector("cliente-list").render();
document.querySelector("producto-list").render();
document.querySelector("factura-resumen").render();

// Inicializa la sección de facturas guardadas y su selector
inicializarFacturasGuardadas();
