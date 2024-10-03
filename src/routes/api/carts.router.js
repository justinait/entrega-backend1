import { Router } from 'express';
import { cartModel } from '../../managers/models/carts.model.js';

const router = Router();

router.post('/', async (req, res) => {
    const { body } = req;
    try {
        const newCart = await cartModel.create(body);
        res.send({ status: 'success', data: newCart });
    } catch (error) {
        console.error('Error creando el carrito:', error.message);
        res.status(500).send({ status: 'error', message: 'Error creando el carrito' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    
    try {
        const { cid, pid } = req.params;
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
        }
        
        // ver si el producto ya esta en el carrito
        const productExists = cart.products.find((product) => product.product.toString() === pid);
        if (productExists) {
            productExists.quantity += 1;
            return res.status(400).send({ status: 'error', message: 'El producto ya está en el carrito' });
        }else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        //agregar al carrito
        cart.products.push(pid);
        
        await cart.save();
        res.json({ status: 'success', message: 'Producto agregado al carrito' });

    } catch (error) {
        console.error('Error agregando el producto al carrito:', error.message);
        res.status(500).send({ status: 'error', message: 'Error agregando el producto al carrito' });
    }
});


router.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    
    const cart = await cartModel.findById(cid).populate('products.product'); 
    res.send({ status: 'success', payload: cart })
    
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartModel.findById(cid);
  
      cart.products = cart.products.filter(product => product.toString() !== pid);
  
      await cart.save();
      res.json({ status: 'success', message: 'Producto eliminado del carrito' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

router.put('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body; // El body tiene que traer un array de productos
  
      const cart = await cartModel.findById(cid);
      cart.products = products;
  
      await cart.save();
      res.json({ status: 'success', message: 'Carrito actualizado' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      const cart = await cartModel.findById(cid);
      const productIndex = cart.products.findIndex(product => product.product.toString() === pid);
  
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.json({ status: 'success', message: 'Cantidad actualizada' });
      } else {
        res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartModel.findById(cid);
  
      cart.products = [];
      await cart.save();
      res.json({ status: 'success', message: 'Carrito vaciado' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
});
  
  
export default router;