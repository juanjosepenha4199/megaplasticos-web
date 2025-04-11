import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { formatPrice, calculateTotalPrice } from '../utils/price';

const Cart: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [openDialog, setOpenDialog] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    setOpenDialog(true);
  };

  const handleSubmitOrder = () => {
    // Aquí iría la lógica para enviar la orden al servidor
    console.log('Orden enviada:', {
      items,
      customerInfo,
      total
    });
    
    setOpenDialog(false);
    clearCart();
    setShowSuccess(true);
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant={isMobile ? "h5" : "h4"} gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
            size={isMobile ? "medium" : "large"}
          >
            Ver Productos
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom>
        Carrito de Compras
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} sm={2}>
                    <CardMedia
                      component="img"
                      height={isMobile ? "60" : "80"}
                      image={item.imageUrl}
                      alt={item.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={9} sm={4}>
                    <Typography variant={isMobile ? "body1" : "h6"}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(item.price)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center' }}>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <IconButton
                        size={isMobile ? "small" : "medium"}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={2} sx={{ textAlign: 'right' }}>
                    <Typography variant={isMobile ? "body1" : "h6"}>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                    <IconButton
                      color="error"
                      size={isMobile ? "small" : "medium"}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                Resumen del Pedido
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography>{formatPrice(total)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Envío:</Typography>
                <Typography>Gratis</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant={isMobile ? "h6" : "h5"}>Total:</Typography>
                <Typography variant={isMobile ? "h6" : "h5"}>{formatPrice(total)}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
                size={isMobile ? "medium" : "large"}
              >
                Proceder al Pago
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Información del Cliente</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre completo"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              value={customerInfo.email}
              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Teléfono"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Dirección de entrega"
              multiline
              rows={3}
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDialog(false)}
            size={isMobile ? "small" : "medium"}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitOrder}
            disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address}
            size={isMobile ? "small" : "medium"}
          >
            Confirmar Orden
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          ¡Orden realizada con éxito! Nos pondremos en contacto contigo pronto.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart; 