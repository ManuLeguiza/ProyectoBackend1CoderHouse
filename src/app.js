import express from "express"
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartRouter from './routes/cart.router.js'
import config from "./config.js"
import handlebars from "express-handlebars"
import viewsRouter from './routes/views.router.js'

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

app.listen(config.PORT, () => {
    console.log('server activo')
})