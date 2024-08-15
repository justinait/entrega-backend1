import { Router } from 'express';
import ProductsManagerFs from '../managers/FileSystem/products.manager.js';

const router = Router();
const { getProducts, getProduct, updateProduct, deleteProduct } = new ProductsManagerFs();

router.get('/', async (req, res)=> {
    try {
        const productsDb = await getProducts();
        res.render('home.handlebars', {
            name: 'Justi',
            title: 'Home - Tienda',
            products: productsDb
        })
    } catch (error) {
        console.log(error);
    }
})


export default router;