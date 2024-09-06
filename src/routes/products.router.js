import { Router } from 'express';
import ProductsManagerFs from '../managers/FileSystem/products.manager.js';
import { productModel } from '../managers/models/products.model.js';

const router = Router();

const { getProducts, createProduct, getProduct, updateProduct, deleteProduct } = new ProductsManagerFs();

const products = [];

router.get('/', async (req, res) => {
    
    const products = await productModel.find()
    res.send({ status: 'success', payload: products })
});

router.post('/', async (req, res) => {
    // validaciones pero en realidad yo ya le puse required, esto serian las validaciones del front?
    // if(!body.title ||)
    // res.send({ status: 'success', data: result });
    const { body } = req;
    const result = await productModel.create(body)
    res.status(200).send({data: result})
});


router.get('/:pid', async (req, res) => {
    const {pid} = req.params
    const product = await productModel.findById(pid)
    res.send({ status: 'success', payload: product })
    
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    let productUpdated = req.body;
    //valida tmb, yo dsp lo hago xq tengo q validar de todo

    const result = await productModel.updateOne({_id: pid}, productUpdated)
    res.send({status: 'success', message: 'usuario actualizado'})
    
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