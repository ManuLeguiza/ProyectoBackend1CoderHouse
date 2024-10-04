import { Router } from "express";

const router = Router ();

router.get ('/', (req, res) => {
    console.log('solicitud recibida de get')
    res.status(200).send({ error: null, data: 'Hola, todo ok'})
});

router.post ('/', (req, res) => {
    const { products } = req.body

    
    if (products != ''){
        const maxId = Match.max(...cart.map(element => +element.id))
        const newCart = {id: maxId + 1, products: []}
        
        cart.push(newCart)

        res.status(200).send({ error: null, data: newCart, file: req.file})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cart.findIndex(element => element.id === id);
    
    if (index > -1) {0
        cart[index] = req.body;
        res.status(200).send({ error: null, data: cart[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el carrito', data: [] });
    }
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cart.findIndex(element => element.id === id);
    
    if (index > -1) {
        cart.splice(index, 1);
        res.status(200).send({ error: null, data: 'Carrito borrado' });
    } else {
        res.status(404).send({ error: 'No se encuentra el carrito', data: [] });
    }
});

export default router;