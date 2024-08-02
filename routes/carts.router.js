import { Router } from 'express';
import CartsManagerFs from '../managers/FileSystem/carts.manager.js';

const router = Router();
const { getCarts, createCart, getCart, deleteCart } = new CartsManagerFs();


router.get('/', async (req, res) => {
    try {
        const cartDb = await getCart();
        res.send({ status: 'success', data: cartDb });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        const response = await createCart(body);
        res.send({ status: 'success', data: response });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const response = await deleteProduct(pid);
        res.send({ status: 'success', message: response.message });
    } catch (error) {
        console.log(error);
    }
});


export default router;