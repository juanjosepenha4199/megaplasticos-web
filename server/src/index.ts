import express from 'express';
import cors from 'cors';
import path from 'path';
import { products } from './data/products';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
