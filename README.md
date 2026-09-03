# Lindero — sitio web

Landing page estática (HTML/CSS/JS puro, sin build step) para la app **Lindero** (GPS, GeoPDF y coordenadas colombianas, sin señal). Descarga: https://play.google.com/store/apps/details?id=com.adanarias.navimap

## Estructura

```
index.html      contenido y estructura de la página
styles.css      estilos, paleta y animaciones
script.js       reveal-on-scroll y smooth scroll
assets/img/     ícono de la app + íconos de funciones
CNAME           dominio personalizado para GitHub Pages
```

## Desarrollo local

No requiere instalación. Basta con servir la carpeta:

```
npx serve .
# o
python -m http.server 8000
```

## Publicar con GitHub Pages

1. Repo → **Settings → Pages** → Source: rama `main`, carpeta `/ (root)`.
2. El archivo `CNAME` ya apunta a `lindero.adanarias.com`; GitHub lo detecta solo.
3. En el proveedor DNS de `adanarias.com`, crea un registro **CNAME**:
   - Host: `lindero`
   - Valor: `<usuario>.github.io`
4. Espera la propagación DNS y activa "Enforce HTTPS" en Settings → Pages una vez el certificado esté listo.
