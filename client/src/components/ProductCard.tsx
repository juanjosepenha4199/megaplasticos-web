import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Stack,
  Tooltip,
  Zoom
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { formatPrice } from '../utils/price';

interface ProductCardProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  specifications: {
    material: string;
    dimensions: string;
    thickness: string;
    units_per_package: number;
    color: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({
  _id,
  name,
  description,
  price,
  image,
  stock,
  specifications,
}) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    addToCart({
      id: _id,
      name,
      price,
      imageUrl: image,
    });
  };

  const handleToggleFavorite = () => {
    if (isFavorite(_id)) {
      removeFromFavorites(_id);
    } else {
      addToFavorites(_id);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[8],
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', pt: '75%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={`http://localhost:5000${image}`}
          alt={name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: 2,
            transition: 'transform 0.3s ease-in-out',
            bgcolor: 'background.paper'
          }}
        />
        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': {
              bgcolor: 'background.paper',
            },
          }}
        >
          {isFavorite(_id) ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontSize: '1.1rem',
            fontWeight: 500,
            lineHeight: 1.3,
            height: '2.6rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {name}
        </Typography>

        <Stack direction="row" spacing={1} mb={1}>
          <Chip 
            label={specifications.material}
            size="small"
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
          <Chip 
            label={specifications.color}
            size="small"
            sx={{ bgcolor: 'secondary.main', color: 'white' }}
          />
        </Stack>

        <Typography 
          variant="h5" 
          color="primary.main" 
          sx={{ 
            fontWeight: 600,
            mb: 1
          }}
        >
          {formatPrice(price)}
        </Typography>

        <Tooltip
          title={
            <Box>
              <Typography variant="body2" fontWeight="bold">Especificaciones:</Typography>
              <Typography variant="body2">• Material: {specifications.material}</Typography>
              <Typography variant="body2">• Dimensiones: {specifications.dimensions}</Typography>
              <Typography variant="body2">• Grosor: {specifications.thickness}</Typography>
              <Typography variant="body2">• Unidades por paquete: {specifications.units_per_package}</Typography>
              <Typography variant="body2">• Color: {specifications.color}</Typography>
            </Box>
          }
          TransitionComponent={Zoom}
          arrow
        >
          <IconButton size="small" sx={{ mb: 1 }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{
            boxShadow: 2,
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          Agregar al Carrito
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;