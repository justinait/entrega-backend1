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
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });
        }
        
        // ver si el producto ya esta en el carrito
        const productExists = cart.products.find((product) => product.toString() === pid);
        if (productExists) {
            return res.status(400).send({ status: 'error', message: 'El producto ya está en el carrito' });
        }
        //agregar al carrito
        cart.products.push(pid);
        const updatedCart = await cart.save();
        
        res.send({ status: 'success', data: updatedCart });

    } catch (error) {
        console.error('Error agregando el producto al carrito:', error.message);
        res.status(500).send({ status: 'error', message: 'Error agregando el producto al carrito' });
    }
});


router.get('/:cid', async (req, res) => {
    const {cid} = req.params;
    
    const cart = await cartModel.findById(cid)
    res.send({ status: 'success', payload: cart })
    
});


export default router;