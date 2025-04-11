import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  TextField, 
  Box, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import ProductCard from './ProductCard';
import { normalizeText } from '../utils/text';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { products as localProducts } from '../data/products';
import { Product, Specifications } from '../types/product';

const categories = [
  'Bolsa selle hermético',
  'Bolsa tipo Camiseta',
  'Strech Negro',
  'Zuncho',
  'Aluminio',
  'Esponjillas',
  'Bolsa luminizada',
  'Cinta Peligo',
  'Rollo Vinipel',
  'Cinta',
  'Impermeable',
  'Guantes',
  'Tapabocas',
  'Mascotas',
  'Cofias'
];

const unitTypes = ['TODOS', 'MILLAR', 'PAQUETE'];

const colors = ['TODOS', 'Verde', 'Negro', 'Rojo', 'Blanco', 'Amarillo', 'Rayado'];

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [color, setColor] = useState('TODOS');
  const [unitType, setUnitType] = useState('TODOS');
  const [sortByPrice, setSortByPrice] = useState<'none' | 'desc' | 'asc'>('none');
  
  useEffect(() => {
    // Usar los datos locales directamente
    setProducts(localProducts);
    setLoading(false);
  }, []);

  const filteredProducts = products.filter((product) => {
    const normalizedSearch = normalizeText(searchTerm);
    const normalizedName = normalizeText(product.name);
    const normalizedDescription = normalizeText(product.description);
    const normalizedCategory = normalizeText(product.category);
    const productName = product.name.toUpperCase();

    const matchesSearch = 
      normalizedName.includes(normalizedSearch) ||
      normalizedDescription.includes(normalizedSearch) ||
      normalizedCategory.includes(normalizedSearch);

    const matchesCategory = category === 'all' || product.category === category;

    const matchesColor = 
      color === 'TODOS' || 
      (product.specifications?.color && normalizeText(product.specifications.color).includes(normalizeText(color)));

    const matchesUnitType = 
      unitType === 'TODOS' || 
      (unitType === 'MILLAR' && productName.endsWith('MILLAR')) ||
      (unitType === 'PAQUETE' && productName.endsWith('PAQUETE'));

    return matchesSearch && matchesCategory && matchesColor && matchesUnitType;
  }).sort((a, b) => {
    if (sortByPrice === 'desc') {
      return b.price - a.price;
    } else if (sortByPrice === 'asc') {
      return a.price - b.price;
    }
    return 0;
  });

  const handleToggleSort = () => {
    setSortByPrice(current => {
      if (current === 'none') return 'desc';
      if (current === 'desc') return 'asc';
      return 'none';
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Catálogo de Productos
      </Typography>
      
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={category}
            label="Categoría"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">Todas las categorías</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel>Color</InputLabel>
          <Select
            value={color}
            label="Color"
            onChange={(e) => setColor(e.target.value)}
          >
            {colors.map(colorOption => (
              <MenuItem key={colorOption} value={colorOption}>{colorOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
          <InputLabel>Unidad</InputLabel>
          <Select
            value={unitType}
            label="Unidad"
            onChange={(e) => setUnitType(e.target.value)}
          >
            {unitTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={
            sortByPrice === 'none' ? "Ordenar por precio (mayor a menor)" :
            sortByPrice === 'desc' ? "Ordenar por precio (menor a mayor)" :
            "Quitar ordenamiento"
          }>
            <IconButton 
              onClick={handleToggleSort}
              color={sortByPrice !== 'none' ? "primary" : "default"}
              sx={{ alignSelf: { xs: 'flex-start', sm: 'center' } }}
            >
              <SortIcon />
            </IconButton>
          </Tooltip>
          {sortByPrice !== 'none' && (
            <Chip
              icon={sortByPrice === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
              label={sortByPrice === 'desc' ? "Mayor a menor precio" : "Menor a mayor precio"}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ 
                display: { xs: 'none', sm: 'flex' },
                minWidth: '160px',
                justifyContent: 'flex-start'
              }}
            />
          )}
        </Box>
      </Box>

      {sortByPrice !== 'none' && (
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, mb: 2 }}>
          <Chip
            icon={sortByPrice === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
            label={sortByPrice === 'desc' ? "Mayor a menor precio" : "Menor a mayor precio"}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ width: '100%', justifyContent: 'flex-start' }}
          />
        </Box>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard
                {...product}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductCatalog; 