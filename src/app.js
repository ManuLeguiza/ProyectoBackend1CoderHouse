import express from "express";

const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get ('/', (req, res) => {
    console.log('solicitud recibida de raiz')
    res.send('Hola, todo ok en raiz')
})

app.get ('/edpoint1', (req, res) => {
    console.log('solicitud recibida de edpoint1')
    res.send('Hola, todo ok en el 1')
})

app.get ('/edpoint2', (req, res) => {
    console.log('solicitud recibida de edpoint2')
    res.send('Hola, todo ok en el 2')
})

app.listen(PORT, () => {
    console.log('server activo')
})