# 🎮 IndieZone - Frontend

Frontend del sistema **IndieZone**, una aplicación web orientada a la gestión de una tienda de videojuegos, consolas y accesorios.

El proyecto está desarrollado con **React + Vite** y utiliza **Bootstrap 5** para la construcción completa de la interfaz gráfica y el diseño responsive.

Actualmente el frontend se encuentra en etapa de desarrollo y posteriormente será conectado con una API REST desarrollada en **FastAPI**, encargada de procesar, validar y almacenar la información en una base de datos **PostgreSQL**.

---

# 📌 Descripción del proyecto

IndieZone es un sistema de gestión para una tienda dedicada a la venta de:

- Videojuegos
- Consolas
- Accesorios
- Productos relacionados con gaming

Desde el frontend se busca proporcionar una interfaz sencilla y organizada para administrar:

- Clientes
- Categorías
- Ofertas
- Productos
- Ventas
- Detalles de venta
- Reportes

El frontend se encarga principalmente de:

- Mostrar información.
- Recoger datos mediante formularios.
- Permitir la navegación entre módulos.
- Mostrar alertas y mensajes al usuario.
- Adaptarse a diferentes tamaños de pantalla.
- Comunicarse posteriormente con FastAPI.

---

# 🛠️ Tecnologías utilizadas

## React

React es utilizado para construir las diferentes pantallas y componentes del sistema.

Entre las funcionalidades utilizadas se encuentran:

- Componentes funcionales.
- `useState`.
- `useEffect`.
- Props.
- Eventos.
- Renderizado condicional.
- Renderizado de listas con `.map()`.
- Búsquedas con `.find()`.
- Manejo de formularios.
- Navegación mediante estados.

---

## Vite

Vite es utilizado como herramienta para crear y ejecutar el proyecto React.

Permite:

- Ejecutar el servidor de desarrollo.
- Actualizar automáticamente los cambios.
- Gestionar módulos JavaScript.
- Generar la versión final del proyecto.

El servidor normalmente se ejecuta en:

```text
http://localhost:5173
```

---

## Bootstrap 5

La interfaz visual de IndieZone está desarrollada principalmente utilizando **Bootstrap 5**.

No se depende de CSS personalizado para el diseño principal de las pantallas.

Bootstrap es utilizado para:

- Navbar.
- Menú hamburguesa.
- Cards.
- Formularios.
- Botones.
- Tablas.
- Alertas.
- Badges.
- Grid responsive.
- Input Groups.
- Márgenes.
- Padding.
- Tipografía.
- Colores.
- Sombras.
- Bordes.
- Distribución responsive.

---

## Axios

Axios será utilizado para realizar las peticiones HTTP desde React hacia FastAPI.

Las principales operaciones serán:

```text
GET
POST
PUT
DELETE
```

La configuración estará centralizada en:

```text
src/services/api.js
```

---

# 📦 Dependencias principales

Las principales dependencias utilizadas son:

```bash
react
react-dom
vite
bootstrap
axios
```

Para instalarlas:

```bash
npm install
```

Si fuera necesario instalar Bootstrap manualmente:

```bash
npm install bootstrap
```

Para Axios:

```bash
npm install axios
```

---

# 📥 Importaciones principales

## Bootstrap

Bootstrap se importa globalmente desde:

```text
src/main.jsx
```

Importaciones:

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

La primera línea carga todos los estilos de Bootstrap.

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
```

La segunda permite utilizar componentes interactivos como el menú hamburguesa:

```javascript
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

---

# ⚛️ Importaciones de React

En diferentes componentes utilizamos herramientas como:

```javascript
import { useState } from "react";
```

y:

```javascript
import { useEffect, useState } from "react";
```

---

## useState

`useState` permite almacenar información temporal dentro de un componente.

Ejemplo:

```javascript
const [pagina, setPagina] = useState("dashboard");
```

En este caso:

- `pagina` guarda la pantalla actual.
- `setPagina` permite cambiarla.

También se utiliza en formularios:

```javascript
const [cliente, setCliente] = useState({
  nombre: "",
  apellido: "",
  dni: "",
  correo: "",
  telefono: "",
  fecha_registro: ""
});
```

---

## useEffect

`useEffect` se utiliza actualmente en el Dashboard para actualizar información como la fecha y hora.

Ejemplo:

```javascript
useEffect(() => {
  const reloj = setInterval(() => {
    setFechaHora(new Date());
  }, 1000);

  return () => clearInterval(reloj);
}, []);
```

Esto permite actualizar el reloj cada segundo.

---

# 🔄 Props

Las propiedades o `props` permiten enviar información o funciones entre componentes.

Por ejemplo:

```jsx
<Dashboard setPagina={setPagina} />
```

El Dashboard recibe:

```javascript
function Dashboard({ setPagina }) {
```

Esto permite cambiar de pantalla directamente desde un botón del Dashboard.

Otro ejemplo:

```jsx
<Navbar
  pagina={pagina}
  setPagina={setPagina}
  setSesionIniciada={setSesionIniciada}
/>
```

De esta manera, el Navbar puede:

- Saber qué página está activa.
- Cambiar de página.
- Cerrar sesión.

---

# 🧭 Navegación del sistema

Actualmente no se utiliza React Router.

La navegación está realizada de una manera sencilla utilizando:

```javascript
useState
```

En `App.jsx`:

```javascript
const [pagina, setPagina] = useState("dashboard");
```

Dependiendo del contenido de `pagina`, React muestra un componente diferente.

Ejemplo:

```jsx
{pagina === "dashboard" && (
  <Dashboard setPagina={setPagina} />
)}

{pagina === "producto" && (
  <RegistroProducto setPagina={setPagina} />
)}

{pagina === "cliente" && (
  <Cliente />
)}
```

La navegación funciona de la siguiente forma:

```text
Navbar
   ↓
setPagina(...)
   ↓
App.jsx
   ↓
Muestra el componente seleccionado
```

---

# 🔐 Inicio de sesión

El proyecto contiene una pantalla de Login.

Actualmente el inicio de sesión funciona de manera visual y temporal mediante React.

Se utiliza:

```javascript
const [sesionIniciada, setSesionIniciada] = useState(false);
```

Mientras sea:

```javascript
false
```

se muestra:

```jsx
<Login />
```

Cuando se inicia sesión:

```javascript
setSesionIniciada(true);
```

se muestra el sistema principal.

Posteriormente el Login podrá conectarse con el backend si se implementa autenticación.

---

# 🧭 Navbar

La barra de navegación permite acceder a:

- Dashboard
- Producto
- Categoría
- Oferta
- Ventas
- Cliente
- Reportes
- Cerrar sesión

Está construida utilizando el componente Navbar de Bootstrap.

Entre las clases utilizadas se encuentran:

```text
navbar
navbar-expand-lg
navbar-toggler
navbar-collapse
collapse
nav-item
btn
```

---

# ☰ Menú hamburguesa

El Navbar es responsive.

En pantallas grandes se muestran todas las opciones horizontalmente.

En pantallas pequeñas Bootstrap transforma automáticamente el menú en un botón hamburguesa:

```text
☰
```

Esto es posible gracias a:

```jsx
navbar-expand-lg
```

y:

```jsx
navbar-toggler
```

junto con:

```javascript
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

---

# 📱 Diseño responsive

Bootstrap utiliza un sistema de columnas responsive.

Ejemplo:

```jsx
className="col-12 col-sm-6 col-xl-3"
```

Esto significa:

```text
Celular
→ ocupa 12 columnas

Pantallas pequeñas
→ ocupa 6 columnas

Pantallas grandes
→ ocupa 3 columnas
```

También se utilizan:

```text
col-md-*
col-lg-*
col-xl-*
```

Esto permite que IndieZone pueda adaptarse a:

- Computadoras.
- Laptops.
- Tablets.
- Celulares.

---

# 🎨 Clases Bootstrap utilizadas

Algunas de las clases más utilizadas son:

## Cards

```html
card
card-body
card-header
card-footer
```

## Botones

```html
btn
btn-primary
btn-success
btn-warning
btn-danger
btn-outline-primary
btn-outline-danger
```

## Formularios

```html
form-label
form-control
form-select
form-check
input-group
input-group-text
```

## Tablas

```html
table
table-hover
table-responsive
table-light
align-middle
```

## Diseño

```html
container-fluid
row
col-*
d-flex
d-grid
align-items-center
justify-content-center
gap-*
```

## Espaciado

```html
p-*
px-*
py-*
m-*
mb-*
mt-*
```

## Apariencia

```html
shadow-sm
rounded-4
border-0
bg-primary-subtle
bg-success-subtle
bg-warning-subtle
bg-info-subtle
```

---

# 📂 Estructura del frontend

La estructura principal utilizada es:

```text
IndieZone/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── RegistroProducto.jsx
│   │   ├── Categoria.jsx
│   │   ├── Oferta.jsx
│   │   ├── Cliente.jsx
│   │   ├── Ventas.jsx
│   │   ├── DetalleVenta.jsx
│   │   ├── Reportes.jsx
│   │   └── Alerta.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

# 🏠 Dashboard

El Dashboard funciona como pantalla principal.

Muestra información resumida mediante Cards de Bootstrap:

- Productos.
- Categorías.
- Ventas.
- Clientes.

También incluye una tabla de productos recientes.

Actualmente algunos valores son temporales y posteriormente serán obtenidos desde el backend.

---

# 📦 Gestión de Productos

El módulo de productos trabaja con la estructura:

```text
id_producto
nombre_producto
tipo_producto
descripcion_producto
precio
stock
id_categoria
id_oferta
```

El formulario utiliza:

```html
form-control
form-select
input-group
```

El identificador:

```text
id_producto
```

no debe ser ingresado manualmente, ya que PostgreSQL lo genera automáticamente.

---

# 🏷️ Gestión de Categorías

La categoría contiene:

```text
id_categoria
nombre
descripcion
```

Permite representar:

- Registro.
- Listado.
- Edición.
- Eliminación.

La lógica real será gestionada posteriormente mediante FastAPI.

---

# 💲 Gestión de Ofertas

Las ofertas contienen:

```text
id_oferta
nombre
porcentaje_descuento
fecha_inicio
fecha_fin
```

Se utilizan campos:

```html
input type="date"
input type="number"
```

y componentes Bootstrap.

---

# 👤 Gestión de Clientes

Los clientes trabajan con:

```text
id_cliente
nombre
apellido
dni
correo
telefono
fecha_registro
```

React almacena temporalmente los datos del formulario con:

```javascript
useState
```

Ejemplo:

```javascript
const [cliente, setCliente] = useState({
  nombre: "",
  apellido: "",
  dni: "",
  correo: "",
  telefono: "",
  fecha_registro: ""
});
```

---

# 🛒 Gestión de Ventas

La tabla de ventas contiene:

```text
id_venta
fecha_venta
total_venta
id_cliente
```

El frontend permite seleccionar un cliente y representar visualmente las ventas registradas.

Posteriormente los clientes serán obtenidos mediante:

```text
GET /clientes/
```

y las ventas desde:

```text
GET /ventas/
```

---

# 🧾 Detalle de Venta

El detalle de venta representa los productos incluidos dentro de una venta.

La estructura utilizada es:

```text
id_venta
id_producto
cantidad
precio_unitario
subtotal
```

La clave de esta tabla está formada por:

```text
id_venta + id_producto
```

Desde la pantalla de ventas se puede acceder mediante:

```text
Ventas
   ↓
Ver detalle
   ↓
Detalle de Venta
```

Esta pantalla no aparece directamente en el Navbar porque funciona como una vista secundaria de Ventas.

---

# 📊 Reportes

El módulo Reportes muestra información resumida del sistema.

Actualmente muestra datos temporales como:

- Productos registrados.
- Clientes registrados.
- Ventas realizadas.
- Ingresos.
- Categorías.
- Ofertas.
- Productos más vendidos.

Posteriormente estos valores serán obtenidos desde FastAPI.

---

# ⚠️ Sistema de alertas

Se creó un componente reutilizable:

```text
Alerta.jsx
```

Este permite mostrar mensajes utilizando Bootstrap.

Ejemplo:

```jsx
<Alerta
  tipo="success"
  mensaje="Cliente registrado correctamente."
  cerrar={cerrarAlerta}
/>
```

Los tipos principales son:

```text
success
danger
warning
info
```

Bootstrap los convierte automáticamente en alertas con diferentes estilos.

---

# 🚨 Manejo de errores del Backend

Posteriormente las respuestas de FastAPI serán procesadas desde React.

Por ejemplo:

```javascript
try {

  // petición al backend

} catch (error) {

  const mensaje =
    error.response?.data?.detail ||
    "Ocurrió un error inesperado.";

}
```

Esto permitirá mostrar directamente mensajes generados por FastAPI.

Por ejemplo:

```text
El DNI debe tener exactamente 8 dígitos numéricos.
```

o:

```text
El cliente ya se encuentra registrado.
```

---

# 🔎 Métodos JavaScript utilizados

En el proyecto aparecen diferentes métodos básicos de JavaScript.

## map()

Utilizado para recorrer listas.

Ejemplo:

```javascript
clientes.map((cliente) => (
  <option key={cliente.id_cliente}>
    {cliente.nombre}
  </option>
))
```

---

## find()

Permite encontrar un elemento específico.

Ejemplo:

```javascript
const cliente = clientes.find(
  item => item.id_cliente === idCliente
);
```

---

## Eventos utilizados

React utiliza diferentes eventos:

```text
onClick
onChange
onSubmit
```

Ejemplo:

```jsx
onClick={() => setPagina("ventas")}
```

Ejemplo de formulario:

```jsx
<form onSubmit={guardarVenta}>
```

Ejemplo de campo:

```jsx
onChange={cambiarDato}
```

---

# 🔗 Conexión con FastAPI

La arquitectura prevista es:

```text
┌───────────────┐
│     React     │
└───────┬───────┘
        │
        │ Axios
        ▼
┌───────────────┐
│    FastAPI    │
└───────┬───────┘
        │
        │ DAO
        ▼
┌───────────────┐
│  PostgreSQL   │
└───────────────┘
```

React no será responsable de guardar directamente información en PostgreSQL.

Su función será:

```text
Recoger información
        ↓
Enviar petición
        ↓
FastAPI
        ↓
Validar
        ↓
Procesar
        ↓
DAO
        ↓
PostgreSQL
```

---

# 🌐 Configuración de Axios

El archivo:

```text
src/services/api.js
```

podrá contener:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
```

Esto evita tener que escribir:

```text
http://localhost:8000
```

en cada petición.

Posteriormente podremos utilizar:

```javascript
import api from "../services/api";
```

y realizar:

```javascript
api.get("/clientes/");
```

o:

```javascript
api.post("/clientes/", datos);
```

---

# 🔄 Operaciones CRUD

El frontend será conectado con las operaciones principales de la API.

```text
GET
→ Obtener registros

POST
→ Registrar

PUT
→ Actualizar

DELETE
→ Eliminar
```

Ejemplo con Clientes:

```text
GET     /clientes/
GET     /clientes/{id}
POST    /clientes/
PUT     /clientes/{id}
DELETE  /clientes/{id}
```

---

# 💾 Base de datos

El frontend no accede directamente a PostgreSQL.

La comunicación será:

```text
Frontend
   ↓
FastAPI
   ↓
DAO
   ↓
PostgreSQL
```

Las tablas principales utilizadas por el sistema son:

```text
cliente
categoria
oferta
producto
venta
detalle_venta
```

---

# 🧪 Datos temporales

Durante la etapa de diseño algunas pantallas contienen arreglos temporales.

Ejemplo:

```javascript
const categorias = [
  {
    id_categoria: 1,
    nombre: "Videojuegos"
  },
  {
    id_categoria: 2,
    nombre: "Consolas"
  }
];
```

Estos datos permiten visualizar las tablas, Cards y formularios antes de conectar FastAPI.

Posteriormente serán reemplazados por peticiones reales.

---

# ▶️ Ejecutar el frontend

Abrir una terminal dentro de la carpeta del proyecto.

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
http://localhost:5173
```

Abrir esa dirección desde el navegador.

---

# 🔥 Recarga automática

Mientras se ejecuta:

```bash
npm run dev
```

Vite detecta automáticamente los cambios realizados en los archivos.

Normalmente solo es necesario guardar con:

```text
Ctrl + S
```

para visualizar los cambios en el navegador.

---

# 📋 Flujo general del sistema

```text
Login
  │
  ▼
Dashboard
  │
  ├── Producto
  │
  ├── Categoría
  │
  ├── Oferta
  │
  ├── Ventas
  │      │
  │      └── Detalle de Venta
  │
  ├── Cliente
  │
  └── Reportes
```

---

# 🚧 Estado actual del proyecto

Actualmente se encuentra desarrollada principalmente la parte visual del frontend.

Se cuenta con:

- Login.
- Navbar.
- Menú hamburguesa.
- Dashboard.
- Gestión de productos.
- Gestión de categorías.
- Gestión de ofertas.
- Gestión de clientes.
- Gestión de ventas.
- Detalle de venta.
- Reportes.
- Alertas Bootstrap.
- Diseño responsive.

Algunas funcionalidades todavía utilizan datos temporales.

---

# 🚀 Próxima etapa

La siguiente etapa consiste en reemplazar los datos temporales por llamadas reales al backend.

El proceso será:

```text
Diseño Bootstrap
       ✅
        ↓
Axios
        ↓
FastAPI
        ↓
Validaciones
        ↓
DAO
        ↓
PostgreSQL
```

Se implementarán progresivamente:

- Listar registros.
- Registrar información.
- Actualizar información.
- Eliminar registros.
- Mostrar errores del backend.
- Actualizar Dashboard.
- Calcular reportes con datos reales.
- Mostrar los detalles reales de las ventas.

---

# ✅ Objetivo del frontend

El objetivo principal del frontend de IndieZone es proporcionar una interfaz:

- Sencilla.
- Ordenada.
- Responsive.
- Fácil de utilizar.
- Fácil de mantener.
- Integrable con FastAPI.
- Construida principalmente con Bootstrap 5.

---

# 🎓 Proyecto académico

IndieZone es desarrollado como proyecto académico con el propósito de aplicar conocimientos relacionados con:

- Desarrollo frontend.
- React.
- JavaScript.
- Bootstrap.
- Diseño responsive.
- Componentes.
- Manejo de estados.
- APIs REST.
- Axios.
- FastAPI.
- PostgreSQL.
- Arquitectura por capas.
- Operaciones CRUD.