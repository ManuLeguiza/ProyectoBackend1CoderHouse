import express from "express"
import { Server } from 'socket.io'
import handlebars from "express-handlebars"
import config from "./config.js"

import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/views', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`))

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
//Consiga de preentrega2
let products = [];

app.get('/home', (req, res) => {
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});
// Websocket: manejo de conexiones
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    // Enviamos la lista actual de productos al conectarse
    socket.emit('productListUpdate', products);
  });
  
  // Ruta para agregar productos
  app.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
  
    // Emitir evento para actualizar la lista de productos
    io.emit('productListUpdate', products);
  
    res.status(201).send('Producto agregado');
  });
  
  // Ruta para eliminar productos
  app.post('/products/delete', (req, res) => {
    const { name } = req.body;
    products = products.filter(p => p.name !== name);
  
    // Emitir evento para actualizar la lista de productos
    io.emit('productListUpdate', products);
  
    res.status(200).send('Producto eliminado');
  });

const httpServer = app.listen(config.PORT, () => {
    console.log(`Server activo en puerto ${config.PORT}`);
});

const socketServer = new Server(httpServer);
app.set('socketServer', socketServer);

socketServer.on('connection', socket => {
    console.log(`Nuevo cliente conectado con id ${socket.id}`);
    socket.on('init_message', data => {
        console.log(data);
    });

    socket.emit('welcome', `Bienvenido cliente, estás conectado con el id ${socket.id}`);
});