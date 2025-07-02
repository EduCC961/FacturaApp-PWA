// Service Worker para FacturaApp 
// Nombre del cache
const CACHE_NAME = "facturacion-cache-v2";

// Archivos que se guardan para usar la app sin internet
const urlsToCache = [
  "/",
  "/index.html",
  "/public/css/estilo.css",
  "/public/js/main.js",
  "/public/manifest.json",
  "/public/img/icono.png",
  "/offline.html" // Pagina que se muestra si todo falla
];

// Cuando se instala el service worker, guarda los archivos en cache
self.addEventListener("install", event => {
  console.log("[SW] Instalando...");
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[SW] Cacheando archivos esenciales");
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        // Si hay un error al guardar archivos
        console.error("[SW] Fallo el cacheo:", err);
      })
  );
});

// Cuando la app pide un archivo
self.addEventListener("fetch", event => {
  console.log(`[SW] Fetching: ${event.request.url}`);
  
  // Si la peticion es para una API, no la guardamos en cache
  if (event.request.url.includes('/api/')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo esta guardado, lo usamos
        if (response) {
          console.log("[SW] Sirviendo desde cache:", event.request.url);
          return response;
        }

        // Si no esta guardado, lo buscamos en internet y lo guardamos
        return fetch(event.request)
          .then(response => {
            // IMPORTANTE: Clonar la respuesta para poder usarla
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // Si no hay internet y es una pagina, mostramos offline.html
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // Si es una imagen y no hay internet, podrias mostrar una imagen de respaldo aqui
            if (event.request.headers.get('accept').includes('image')) {
              return caches.match('/public/img/placeholder.png');
            }
          });
      })
  );
});

// Cuando se actualiza el service worker, borra los caches viejos
self.addEventListener("activate", event => {
  console.log("[SW] Activado!");
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("[SW] Borrando cache viejo:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});