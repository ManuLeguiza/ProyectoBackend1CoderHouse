import { Router } from "express";

const router = Router ();

router.get ('/api/products', (req, res) => {
    console.log('solicitud recibida de get')
    res.status(200).send({ error: null, data: 'Hola, todo ok'})
});

router.post ('/api/products', (req, res) => {
    console.log('solicitud recibida de post')
    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')){
        res.status(200).send({ error: null, data: `${req.body.firstName}, ${req.body.lastName} (activo: ${req.body.active})`})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
});

router.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(element => element.id === id);
    
    if (index > -1) {0
        products[index] = req.body;
        res.status(200).send({ error: null, data: products[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(element => element.id === id);
    
    if (index > -1) {
        products.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

export default router;