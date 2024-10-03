import { Router } from "express";

const router = Router ();

router.get ('/api/cart', (req, res) => {
    console.log('solicitud recibida de get')
    res.status(200).send({ error: null, data: 'Hola, todo ok'})
});

router.post ('/api/cart', (req, res) => {
    console.log('solicitud recibida de post')
    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')){
        res.status(200).send({ error: null, data: `${req.body.firstName}, ${req.body.lastName} (activo: ${req.body.active})`})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
});

router.put('/api/cart/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cart.findIndex(element => element.id === id);
    
    if (index > -1) {0
        cart[index] = req.body;
        res.status(200).send({ error: null, data: cart[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/api/cart/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cart.findIndex(element => element.id === id);
    
    if (index > -1) {
        cart.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

export default router;