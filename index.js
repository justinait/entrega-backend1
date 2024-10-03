import express from 'express';
import productRouter from './src/routes/api/products.router.js';
import cartRouter from './src/routes/api/carts.router.js';
import userRouter from './src/routes/api/users.router.js';
import viewsRouter from './src/routes/api/views.router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'
import { chatSocket } from './src/utils/chatSocket.js';
import { connectDB } from './src/managers/config/index.js';
import { productModel } from './src/managers/models/products.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;

app.engine('handlebars', engine())

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'handlebars')



const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter )
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(500).send('error de server');
});

connectDB()

// chatSocket(io);
const ioMiddleware = (ïo) => (req, res, next) => {
    req.io = io;
    next()
}

const productSocket = (io) => {
    io.on('connection', async socket => {
        try {
            // Obtener todos los productos desde MongoDB
            const products = await productModel.find().lean(); // Encuentra todos los productos
            socket.emit('products', products);

            // Escuchar evento 'addProduct' para agregar un producto
            socket.on('addProduct', async (data) => {
                try {
                    console.log('Producto recibido desde el cliente:', data);
                    
                    // Crear un nuevo producto en la base de datos
                    const newProduct = new productModel(data); // Se crea una instancia del modelo con los datos recibidos
                    await newProduct.save(); // Guardar el producto en MongoDB

                    // Volver a emitir todos los productos actualizados a todos los clientes conectados
                    const updatedProducts = await productModel.find().lean();
                    io.emit('products', updatedProducts); // Enviar la lista actualizada de productos
                } catch (error) {
                    console.error('Error agregando producto:', error);
                }
            });
        } catch (error) {
            console.error('Error obteniendo productos desde MongoDB:', error);
        }
    })
}

productSocket(io)