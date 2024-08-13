import { Router } from 'express';

const router = Router();

router.get('/', (req, res)=> {
    res.render('home.handlebars', {
        name: 'Justi',
        title: 'Home - Tienda'
    })
})


export default router;