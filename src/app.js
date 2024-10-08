import express from "express";
import productsRouter from './routes/products.router.js'
import usersRouter from './routes/users.router.js'
import cartRouter from './routes/cart.router.js'
import config from "./config.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/static', express.static(`${config.DIRNAME}/public`))

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.listen(config.PORT, () => {
    console.log('server activo')
})