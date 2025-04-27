# Fullstack Product App

Este proyecto es una aplicación fullstack diseñada para gestionar productos, transacciones y pagos. Está compuesto por un backend desarrollado con NestJS y un frontend construido con React y Vite. A continuación, se detalla la arquitectura, instalación y funcionamiento del proyecto.

## Arquitectura

La aplicación sigue una arquitectura modular y está dividida en dos partes principales:

### Backend
- **Framework**: NestJS
- **Estructura**:
  - `application`: Contiene los servicios de la aplicación.
  - `domain`: Define las entidades del dominio.
  - `infrastructure`: Contiene los controladores y la lógica de acceso a datos.
- **Base de datos**: Configurada para manejar datos relacionados con productos, transacciones, clientes y entregas.

### Frontend
- **Framework**: React con Vite
- **Estructura**:
  - `components`: Componentes reutilizables como Navbar y Footer.
  - `pages`: Páginas principales como Productos, Carrito y Formulario de Pago.
  - `store`: Manejo del estado global con Redux Toolkit.
  - `utils`: Funciones utilitarias como validaciones.

## Instalación

### Requisitos previos
- Node.js (v16 o superior)
- Docker y Docker Compose

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd fullstack-product-app
   ```
2. Instalar dependencias del backend y frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Configurar las variables de entorno:
   - Backend: Crear un archivo `.env` en la carpeta `backend` con las configuraciones necesarias.
   - Frontend: Configurar las variables en `vite.config.ts` si es necesario.
4. Iniciar los servicios con Docker Compose:
   ```bash
   docker-compose up
   ```

## Uso

1. Acceder al frontend en `http://localhost:3000`.
2. Utilizar la API del backend en `http://localhost:4000`.

## Funcionalidades

- **Productos**: Visualización y gestión de productos.
- **Carrito**: Agregar productos al carrito y gestionar cantidades.
- **Pagos**: Procesar pagos utilizando la API de Wompi.
- **Transacciones**: Registro y actualización del estado de las transacciones.

## Pruebas

### Backend
Ejecutar pruebas unitarias y de integración:
```bash
cd backend
npm run test
```

### Frontend
Ejecutar pruebas unitarias:
```bash
cd frontend
npm run test
```

## Contribución

1. Crear un fork del repositorio.
2. Crear una rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realizar un pull request.

---

Para más detalles, consulta los README específicos en las carpetas `backend` y `frontend`.