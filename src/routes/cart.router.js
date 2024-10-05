import { Router } from "express";
import { products } from "../config";
import { promises as fs } from 'fs';

const router = Router ();
const carts =[]
const cartIdCounter = 1
const cartsFilePath = './carrito.json';

async function readCartsFile() {
    try {
        const data = await fs.readFile(cartsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de carritos:", error);
        return [];
    }
}

async function writeCartsFile(carts) {
    try {
        await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error("Error al escribir en el archivo de carritos:", error);
    }
}

router.post('/', async (req, res) => {
    let carts = await readCartsFile();
    const newCart = {
        id: carts.length + 1, 
        products: []
    };
    
    carts.push(newCart);
    await writeCartsFile(carts);
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const carts = await readCartsFile();
    const cart = carts.find(c => c.id == cid);

    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    res.json(cart.products);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const carts = await readCartsFile();

    const cart = carts.find(c => c.id == cid);
    if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productInCart = cart.products.find(p => p.product == pid);
    
    if (productInCart) {
        productInCart.quantity += 1;  
    } else {
        cart.products.push({ product: pid, quantity: 1 });  
    }
    await writeCartsFile(carts);  
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