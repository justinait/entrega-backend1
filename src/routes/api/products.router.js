import { Router } from 'express';
import { productModel } from '../../managers/models/products.model.js';

const router = Router();

const products = [];

router.get('/', async (req, res) => {
    
    const products = await productModel.find()
    res.send({ status: 'success', payload: products })
});

router.post('/', async (req, res) => {
    // validaciones pero en realidad yo ya le puse required, esto serian las validaciones del front?
    const { body } = req;
    if(!body.title ||!body.description ||!body.code ||!body.price || !body.category ||!body.stock){
        return  res.status(400).send({status: 'error', error: 'Todos los campos son oligatorios'})
    }
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
    if(!body.title ||!body.description ||!body.code ||!body.price || !body.category ||!body.stock){
        return  res.status(400).send({status: 'error', error: 'Todos los campos son oligatorios'})
    }
    const result = await productModel.updateOne({_id: pid}, productUpdated)
    res.send({status: 'success', message: 'usuario actualizado'})
    
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    const result = await productModel.deleteOne({_id: pid})
    res.send({status: 'success', message: 'usuario eliminado'})

});

export default router;