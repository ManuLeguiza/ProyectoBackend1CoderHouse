import { Router } from "express";
import { products } from '../config.js';
import { promises as fs } from 'fs';


const productsFilePath = './productos.json';
const router = Router ();

async function readProductsFile() {
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de productos:", error);
        return [];
    }
}
async function writeProductsFile(products) {
    try {
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Error al escribir en el archivo de productos:", error);
    }
}


router.get ('/', async (req, res) => {
    const products = await readProductsFile();
    let { limit } = req.query;
    limit = limit ? parseInt(limit) : products.length;
    res.json(products.slice(0, limit));
});

router.get('/:pid', async (req, res) => {
    const products = await readProductsFile();
    const { pid } = req.params;
    const product = products.find(p => p.id == pid);
    
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(product);
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