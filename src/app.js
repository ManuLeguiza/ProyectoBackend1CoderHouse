import express from "express"
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartRouter from './routes/cart.router.js'
import config from "./config.js"
import handlebars from "express-handlebars"
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/static', express.static(`${config.DIRNAME}/public`))

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/views', viewsRouter);

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