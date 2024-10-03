import { Router } from 'express';
import { productModel } from '../../managers/models/products.model.js';

const router = Router();

router.get('/', async (req, res)=> {
    try {
        const products = await productModel.find().lean()
        res.render('home.handlebars', {
            title: 'Home - Tienda',
            products: products
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/realtimeproducts', async (req, res)=> {
    try {
        const products = await productModel.find().lean()
        res.render('realTimeProducts.handlebars', {
            title: 'Real Time Products',
            products: products
        })

    } catch (error) {
        console.log(error);
    }
})


export default router;