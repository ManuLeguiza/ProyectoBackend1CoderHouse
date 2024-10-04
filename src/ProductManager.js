import fs from 'fs';

export class ProductManager {
    constructor(file) {
        this.file = file;
    }

    async init() {
        try {
        
            const exists = await fs.promises.access(this.file);
            console.log('El producto existe');
        } catch (err) {
      
            console.log('El producto NO existe');
            await fs.promises.writeFile(this.file, JSON.stringify([]));
        }
    }

    async #readProductFile() {
        const products = await fs.promises.readFile(this.file, 'utf-8');

        return JSON.parse(products);
    }

    async createProduct(data) {

        const products = await this.#readProductFile();
        products.push(data);

        await fs.promises.writeFile(this.file, JSON.stringify(products));
        console.log('Producto agregado');
    }

    async getProducts() {
        return await this.#readProductFile();
    }
}