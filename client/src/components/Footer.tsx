import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Email, Phone, LocationOn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
              Megaplásticos La Pradera
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Tu proveedor confiable de productos plásticos de alta calidad para todas tus necesidades.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" aria-label="Facebook" component="a" href="#" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="primary" aria-label="Instagram" component="a" href="#" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="primary" aria-label="WhatsApp" component="a" href="#" target="_blank">
                <WhatsApp />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
              Enlaces Rápidos
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="text.secondary" underline="hover">
                Inicio
              </Link>
              <Link href="/products" color="text.secondary" underline="hover">
                Productos
              </Link>
              <Link href="/favorites" color="text.secondary" underline="hover">
                Favoritos
              </Link>
              <Link href="/cart" color="text.secondary" underline="hover">
                Carrito
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary" gutterBottom fontWeight="bold">
              Contacto
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOn color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Carrera 66 #4B -98 (Esquina)
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Phone color="primary" />
                <Typography variant="body2" color="text.secondary">
                  +57 3214855914
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Email color="primary" />
                <Typography variant="body2" color="text.secondary">
                  juliethapo@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 5, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {new Date().getFullYear()}  Iberoamericana plasticos. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;