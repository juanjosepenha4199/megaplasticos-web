# Megaplasticos La Pradera - E-commerce Website

Una aplicación web moderna para la venta de productos plásticos, desarrollada con React, Node.js, Express y MongoDB.

## Características

- Catálogo de productos con filtros y búsqueda
- Carrito de compras
- Gestión de inventario
- Sistema de pedidos
- Interfaz de usuario moderna y responsive
- Panel de administración para gestionar productos y pedidos

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (v4.4 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd megaplasticos-web
```

2. Instalar dependencias del frontend:
```bash
cd client
npm install
```

3. Instalar dependencias del backend:
```bash
cd ../server
npm install
```

4. Configurar variables de entorno:
   - Copiar el archivo `.env.example` a `.env`
   - Actualizar las variables según tu entorno

## Configuración de la Base de Datos

1. Asegúrate de tener MongoDB instalado y ejecutándose
2. La base de datos se creará automáticamente al iniciar la aplicación

## Ejecución

1. Iniciar el servidor backend:
```bash
cd server
npm run dev
```

2. Iniciar el cliente frontend:
```bash
cd client
npm start
```

La aplicación estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Estructura del Proyecto

```
megaplasticos-web/
├── client/                 # Frontend React
│   ├── public/
│   └── src/
│       ├── components/     # Componentes React
│       ├── pages/         # Páginas de la aplicación
│       └── services/      # Servicios API
├── server/                 # Backend Node.js
│   ├── src/
│   │   ├── models/        # Modelos Mongoose
│   │   └── routes/        # Rutas API
│   └── .env               # Variables de entorno
└── README.md
```

## API Endpoints

### Productos
- GET /api/products - Obtener todos los productos
- GET /api/products/:id - Obtener un producto por ID
- POST /api/products - Crear un nuevo producto
- PUT /api/products/:id - Actualizar un producto
- DELETE /api/products/:id - Eliminar un producto

### Pedidos
- GET /api/orders - Obtener todos los pedidos
- GET /api/orders/:id - Obtener un pedido por ID
- POST /api/orders - Crear un nuevo pedido
- PATCH /api/orders/:id/status - Actualizar estado del pedido

## Tecnologías Utilizadas

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Créditos

Este proyecto fue desarrollado por:
- **Juan José Penha** - Ingeniero de Sistemas

## Contacto

Megaplasticos La Pradera
- Email: info@megaplasticoslapradera.com
- Website: https://www.megaplasticoslapradera.com 