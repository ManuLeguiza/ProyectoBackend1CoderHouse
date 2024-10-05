import { Router } from "express";
import { products } from "../config";

const router = Router ();
const carts =[]
const cartIdCounter = 1

router.get ('/', (req, res) => {
    console.log('solicitud recibida de get')
    const {id } = req.params;
    const cart = carts.find(c => id == id);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    } else {
        res.status(200).send({ error: null, data: 'Hola, todo ok'})
    }

    res.json(cart.products); 
});
   


router.post ('/', (req, res) => {
    const newCart = {
        id: cartIdCounter++,  
        products: []          
    };
    
    carts.push(newCart);
    res.status(201).json(newCart); 

    
    if (products != ''){
        const maxId = Match.max(...cart.map(element => +element.id))
        const newCart = {id: maxId + 1, products: []}
        
        cart.push(newCart)

        res.status(200).send({ error: null, data: newCart, file: req.file})
    } else {
        res.status(400).send({error: 'Faltan campos obligatorios', data: []})
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;

    const cart = carts.find(c => cid == cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productInCart = cart.products.find(p => p.product == pid);
    
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    res.status(200).json(cart);  
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