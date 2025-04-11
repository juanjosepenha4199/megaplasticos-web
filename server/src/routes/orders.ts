import express from 'express';
import Order, { IOrder } from '../models/Order';
import Product from '../models/Product';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la orden' });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);

    // Check stock availability and update product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          message: `Producto no encontrado: ${item.product}`,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Stock insuficiente para ${product.name}`,
        });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la orden' });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    // If order is cancelled, restore product stock
    if (status === 'cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock += item.quantity;
          await product.save();
        }
      }
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el estado de la orden' });
  }
});

// Get orders by customer email
router.get('/customer/:email', async (req, res) => {
  try {
    const orders = await Order.find({
      'customer.email': req.params.email.toLowerCase(),
    }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener órdenes del cliente' });
  }
});

// Delete order (only if pending)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        message: 'Solo se pueden eliminar órdenes pendientes',
      });
    }

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.deleteOne();
    res.json({ message: 'Orden eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden' });
  }
});

export default router; 