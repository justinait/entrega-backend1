import { Router } from 'express';
import ProductsManagerFs from '../managers/FileSystem/products.manager.js';

const router = Router();
const { getProducts, getProduct, updateProduct, deleteProduct } = new ProductsManagerFs();

router.get('/', async (req, res)=> {
    try {
        const productsDb = await getProducts();
        res.render('home.handlebars', {
            title: 'Home - Tienda',
            products: productsDb
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/realtimeproducts', async (req, res)=> {
    try {
        const productsDb = await getProducts();
        res.render('realTimeProducts', {
            title: 'Real Time Products',
            // products: productsDb
        })
    } catch (error) {
        console.log(error);
    }
})


export default router;