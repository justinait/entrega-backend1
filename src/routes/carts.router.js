import { Router } from 'express';
import CartsManagerFs from '../src/managers/FileSystem/carts.manager.js';

const router = Router();
const { addProductToCart, createCart, getCart } = new CartsManagerFs();


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

router.post('/:cid/product/:pid', async (req, res) => {
    const {cid} = req.params
    const {pid} = req.params
    try {
        const response = await addProductToCart(cid, pid);
        res.send({ status: 'success', data: response });
    } catch (error) {
        console.log(error);
    }
});

router.get('/:cid', async (req, res) => {
    const {cid} = req.params
    try {
        const cart = await getCart(cid);
        res.send({ status: 'success', cart: cart });
    } catch (error) {
        console.log(error);
    }
});


export default router;