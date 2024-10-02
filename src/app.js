import express from "express";

const PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get ('/', (req, res) => {
    console.log('solicitud recibida de raiz')
    res.send('Hola, todo ok en raiz')
})

app.get ('/api/users', (req, res) => {
    console.log('solicitud recibida de get')
    res.status(200).send({ error: null, data: 'Hola, todo ok'})
})

app.post ('/api/users', (req, res) => {
    console.log('solicitud recibida de post')
    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')){
        res.status(200).send({ error: null, data: `${req.body.firstName}, ${req.body.lastName} (activo: ${req.body.active})`})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
    
})

app.listen(PORT, () => {
    console.log('server activo')
})