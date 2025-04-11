export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

interface CartItem {
  price: number;
  quantity: number;
}

export const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};