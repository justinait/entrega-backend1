import express from 'express';
import productRouter from './src/routes/products.router.js';
import cartRouter from './src/routes/carts.router.js';
import viewsRouter from './src/routes/views.router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

app.engine('handlebars', engine())
// app.set('views', '/src/views')
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'handlebars')


// app.get('/', (req, res) => {
//     res.send('¡Hola, mundo!');
// });

const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter )
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send('error de server');
});
