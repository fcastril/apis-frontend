// Service Worker para interceptar y corregir MIME types
// Colocar en public/sw.js

self.addEventListener("fetch", (event) => {
  const url = event.request.url;

  // Interceptar archivos JavaScript
  if (
    url.endsWith(".js") ||
    url.endsWith(".mjs") ||
    (url.includes("/assets/") && url.includes(".js"))
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Si la respuesta es exitosa pero tiene MIME type incorrecto
          if (
            response.ok &&
            response.headers.get("content-type") === "application/octet-stream"
          ) {
            // Crear nueva respuesta con MIME type correcto
            const newHeaders = new Headers(response.headers);
            newHeaders.set(
              "content-type",
              "application/javascript; charset=utf-8"
            );

            return response.blob().then((blob) => {
              return new Response(blob, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders,
              });
            });
          }
          return response;
        })
        .catch(() => {
          // En caso de error, retornar la respuesta original
          return fetch(event.request);
        })
    );
  }
});
