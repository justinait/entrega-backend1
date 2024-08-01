import { Router } from 'express';
import ProductsManagerFs from '../managers/FileSystem/products.manager.js';

const router = Router();

const { getProducts, createProduct, getProduct, updateProduct } = new ProductsManagerFs();

router.get('/', async (req, res) => {
    try {
        const productsDb = await getProducts();
        res.send({ status: 'success', data: productsDb });
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { body } = req;
        console.log(body);
        const response = await createProduct(body);
        res.send({ status: 'success', data: response });
    } catch (error) {
        console.log(error);
    }
});


router.get('/:pid', async (req, res) => {
    const {pid} = req.params
    try {
        const product = await getProduct(pid);
        res.send({ status: 'success', product: product });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: 'Server error' });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const productUpdated = req.body;
    try {
        const updatedProduct = await updateProduct(pid, productUpdated);
        res.send({ status: 'success', product: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: 'Server error' });
    }
});

export default router;
