import { Router } from "express";
import { products } from '../config.js';


const router = Router ();

router.get ('/', (req, res) => {
    console.log('solicitud recibida de get')
    res.status(200).send({ error: null, data: 'Hola, todo ok'})
});

router.post ('/', (req, res) => {
    const {title, description, code, price, stock, category} = req.body

    
    if (title != '' && description != '' && code != '' && price != '' && stock != '' && category != ''){
        const maxId = Match.max(...products.map(element => +element.id))
        const newProduct = {id: maxId + 1, title: title, description: description, code: code, price: price, stock: stock, category: category}
        
        cart.push(newProduct)

        res.status(200).send({ error: null, data: newProduct, file: req.file})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(element => element.id === id);
    
    if (index > -1) {0
        products[index] = req.body;
        res.status(200).send({ error: null, data: products[index] });
    } else {
        res.status(404).send({ error: 'No se encuentra el usuario', data: [] });
    }
});

router.delete('/:id', (req, res) => {
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