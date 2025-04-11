import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ShoppingCart,
  Favorite as FavoriteIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { theme } from './theme/theme';
import Home from './components/Home';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import Favorites from './components/Favorites';
import Footer from './components/Footer';

const NavigationBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Productos', icon: <InventoryIcon />, path: '/products' },
    { text: 'Favoritos', icon: <FavoriteIcon />, path: '/favorites' },
    { text: 'Carrito', icon: <ShoppingCart />, path: '/cart' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 'bold',
              flexGrow: isMobile ? 0 : 1,
            }}
          >
            Megaplásticos
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            {isMobile && (
              <>
                <IconButton
                  color="primary"
                  component={Link}
                  to="/favorites"
                >
                  <Badge badgeContent={favorites.length} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  color="primary"
                  component={Link}
                  to="/cart"
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <NavigationBar />
              <Box component="main" sx={{ flexGrow: 1, pt: { xs: 7, sm: 8 } }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductCatalog />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
