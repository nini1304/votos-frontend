# votos-frontend

`votos-frontend` es la interfaz web estatica del sistema de votacion serverless. Permite seleccionar un candidato y enviar el voto al backend `votos`, que procesa la solicitud con AWS Lambda y almacena la informacion en DynamoDB.

Este repositorio corresponde al frontend del sistema y consume el endpoint publicado por API Gateway.

## Caracteristicas principales

- Interfaz HTML simple para votar por un candidato.
- Opciones de candidatos mediante radio buttons.
- Envio de voto con `fetch`.
- Integracion directa con API Gateway.
- Validacion basica para evitar enviar votos sin candidato seleccionado.
- Confirmacion visual con `alert` al completar la solicitud.
- No requiere framework ni proceso de build.

## Stack tecnologico

- HTML5
- CSS3
- JavaScript
- Fetch API
- AWS API Gateway como backend HTTP

## Arquitectura

```text
votos-frontend
|-- index.html   # Estructura de la pantalla de votacion
|-- main.js      # Logica de seleccion y envio del voto
`-- style.css    # Estilos de la interfaz
```

## Relacion con el backend

El frontend envia votos al backend serverless `votos`:

```text
POST https://ufrsgf32v2.execute-api.us-east-1.amazonaws.com/dev/vote
```

Flujo general:

```text
index.html -> main.js -> API Gateway -> AWS Lambda -> DynamoDB
```

Payload enviado:

```json
{
  "voteId": "42",
  "voteOption": "candidato1"
}
```

## Requisitos previos

- Navegador web moderno.
- Backend `votos` desplegado en AWS.
- Endpoint de API Gateway disponible y con CORS habilitado.

No se requiere instalar dependencias.

## Ejecucion local

Como es un frontend estatico, se puede abrir directamente:

```text
index.html
```

Tambien se puede servir con un servidor local simple:

```bash
python -m http.server 8080
```

Luego abrir:

```text
http://localhost:8080
```

## Configuracion

La URL del backend esta definida en `main.js`:

```js
fetch('https://ufrsgf32v2.execute-api.us-east-1.amazonaws.com/dev/vote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(voteData)
})
```

Si se redepliega el backend y cambia la URL de API Gateway, actualizar ese valor.

## Funcionamiento

1. El usuario selecciona un candidato.
2. Hace clic en `Votar`.
3. `main.js` genera un `voteId`.
4. Se construye el objeto `{ voteId, voteOption }`.
5. Se envia una solicitud `POST` al endpoint `/vote`.
6. Si la API responde correctamente, se muestra `Voto exitoso`.

## Modulos funcionales

| Archivo | Responsabilidad |
| --- | --- |
| `index.html` | Renderiza titulo, candidatos y boton de voto |
| `main.js` | Captura seleccion, genera payload y llama a la API |
| `style.css` | Define estilos basicos de la pagina |

## Consideraciones tecnicas

- `index.html` referencia `styles.css`, pero el archivo real se llama `style.css`. Para que los estilos carguen correctamente, se recomienda cambiar el enlace a `style.css` o renombrar el archivo.
- El `voteId` se genera con un numero aleatorio entre `0` y `99`; esto puede causar votos sobrescritos en DynamoDB si se repite el mismo ID.
- Para una version mas robusta se recomienda usar `crypto.randomUUID()` o generar el ID en el backend.
- La URL de API Gateway esta hardcodeada en `main.js`; para distintos ambientes se recomienda moverla a una constante de configuracion.
- El frontend no muestra resultados ni conteo de votos; solo envia el voto.

## Despliegue

Este frontend puede publicarse en cualquier hosting estatico:

- Amazon S3 + CloudFront
- GitHub Pages
- Netlify
- Vercel
- Nginx
- Apache

Para despliegue en AWS, una opcion natural es:

```text
S3/CloudFront -> API Gateway -> Lambda -> DynamoDB
```

## Orden sugerido de uso

1. Desplegar el backend `votos`.
2. Copiar la URL generada por API Gateway.
3. Actualizar `main.js` si la URL cambio.
4. Corregir el enlace CSS si se desea cargar estilos.
5. Abrir o desplegar `votos-frontend`.

