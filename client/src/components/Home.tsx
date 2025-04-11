import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
} from '@mui/material';
import { 
  LocalShipping, 
  Security, 
  Support, 
  ShoppingCart,
  Inventory,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Envío Rápido',
      description: 'Entrega en todo el país en tiempo récord'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Productos de Calidad',
      description: 'Materiales certificados y garantizados'
    },
    {
      icon: <Support sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Soporte 24/7',
      description: 'Atención personalizada cuando la necesites'
    },
    {
      icon: <Inventory sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Amplio Inventario',
      description: 'Gran variedad de productos disponibles'
    }
  ];

  const categories = [
    {
      title: 'Bolsas Plásticas',
      image: '/images/products/sellehermetico3x2.jpg',
      description: 'Soluciones de empaque para todo tipo de necesidades'
    },
    {
      title: 'Productos Industriales',
      image: '/images/products/strech.jpg',
      description: 'Materiales de alta resistencia para uso industrial'
    },
    {
      title: 'Artículos de Limpieza',
      image: '/images/products/guantes.jpg',
      description: 'Productos para mantener la higiene y seguridad'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, rgba(33,150,243,0.95), rgba(0,188,212,0.95))',
          color: 'white',
          py: isMobile ? 8 : 12,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(/pattern.png)',
            opacity: 0.1,
            zIndex: 0
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h3" : "h1"} 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Megaplásticos La Pradera
              </Typography>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                paragraph
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Innovación y calidad en productos plásticos para todas tus necesidades
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  Ver Catálogo
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ 
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Conoce Más
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="/hero-image.png"
                alt="Productos Megaplásticos"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.2))'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ py: isMobile ? 6 : 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            ¿Por qué elegirnos?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Categories Section */}
        <Box sx={{ py: isMobile ? 6 : 10 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 6 }}
          >
            Nuestras Categorías
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      '& img': {
                        transform: 'scale(1.05)'
                      }
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', pt: '60%', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={category.image}
                      alt={category.title}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease-in-out'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {category.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            py: isMobile ? 6 : 10,
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            ¿Listo para comenzar?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Descubre nuestra amplia gama de productos y encuentra exactamente lo que necesitas
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            sx={{ px: 4, py: 1.5 }}
          >
            Explorar Catálogo
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;