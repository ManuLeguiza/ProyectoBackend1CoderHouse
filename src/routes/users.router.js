import { Router } from "express";

const router = Router ();
const users = [
    { id: 1, firstName: 'Juan', lastName: 'Rodriguez'},
    { id: 2, firstName: 'Carlos', lastName: 'Lopez'},
    { id: 3, firstName: 'Luis', lastName: 'Dias'}
]

router.get ('/', (req, res) => {
    console.log('solicitud recibida de get')
    res.status(200).send({ error: null, data: 'Hola, todo ok'})
});

router.post ('/', (req, res) => {
    console.log('solicitud recibida de post')
    if (req.body.hasOwnProperty('firstName') && req.body.hasOwnProperty('lastName')){
        res.status(200).send({ error: null, data: `${req.body.firstName}, ${req.body.lastName} (activo: ${req.body.active})`})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {0
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    
    if (index > -1) {
        users.splice(index, 1);
        res.status(200).send({ error: null, data: 'Usuario borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

export default router;