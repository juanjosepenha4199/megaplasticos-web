import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ProductCard from './ProductCard';
import { useFavorites } from '../context/FavoritesContext';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const allProducts = await response.json();
        const favoritesList = allProducts.filter((product: any) => 
          favorites.includes(product._id)
        );
        setFavoriteProducts(favoritesList);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFavoriteProducts();
  }, [favorites]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mis Favoritos
      </Typography>

      {favoriteProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No tienes productos favoritos aún
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favoriteProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites; 