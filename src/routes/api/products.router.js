import { Router } from 'express';
import { productModel } from '../../managers/models/products.model.js';

const router = Router();

const products = [];

router.get('/', async (req, res) => {

    try {
        const { limit = 10, page = 1, sort, query } = req.query;
    
        const filter = query ? { $or: [{ category: query }, { availability: query }] } : {};
    
        const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
    
        const products = await productModel.paginate(filter, {
          limit: parseInt(limit),
          page: parseInt(page),
          sort: sortOption,
          lean: true
        });
    
        const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products;
    
        res.json({
          status: 'success',
          payload: docs,
          totalPages,
          prevPage,
          nextPage,
          page: products.page,
          hasPrevPage,
          hasNextPage,
          prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null,
          nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null,
        });
      } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
      }
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
    const product = await productModel.findById(pid).lean();
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

    const cart = await cartModel.findOne({_id: '66c7c9cd4fd58f55ebcd9c60' })
  
    console.log(JSON.stringify(cart, null, 2))
});

export default router;