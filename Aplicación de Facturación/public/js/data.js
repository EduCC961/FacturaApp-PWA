// Carga la lista de clientes desde localStorage, o un array vacío si no hay datos
export let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// Carga la lista de productos desde localStorage, o un array vacío si no hay datos
export let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Carga la lista de facturas desde localStorage, o un array vacío si no hay datos
export let facturas = JSON.parse(localStorage.getItem("facturas")) || [];

// Objeto para almacenar la factura que se está creando actualmente
export let facturaActual = { productos: [], total: 0 };
