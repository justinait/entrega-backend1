import { promises as fs } from 'fs';
import { __dirname } from '../dirname.js';
import { join } from 'path';

const path = join(__dirname, 'dbjson', 'products.json');

class ProductsManagerFs {
    constructor(){
        this.products = [];
        this.path = path;
    }

    readProducts = async () => {
        try {
            const productsJson = await fs.readFile(path, 'utf-8')
            const productsJs = JSON.parse(productsJson);
            if (!Array.isArray(productsJs)) {
                throw new Error('Products data is not an array');
            }
            return productsJs
        } catch (error) {
            return []
        }
    }
    getProducts = async () => {
        return await this.readProducts()
    }
    getProduct = async (id) => {
        let products = await this.readProducts()
        
        const product = products.find(e => {
            return e.id == id;
        })
        return product
    }

    createProduct = async (newProduct) => {
        try {
            const products = await this.readProducts()
            if(products.length === 0){
                newProduct.id = 1;
            } else {
                newProduct.id = products[products.length-1].id+1;
            }
            products.push(newProduct)
            //sobreescribis el archivo de la ruta con el nuevo objeto
            await fs.writeFile(this.path, JSON.stringify(products, null, '\t'))
            return newProduct

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    updateProduct = async (id, productUpdated) => {
        try {
            const products = await this.readProducts();
            const productIndex = products.findIndex(p => p.id == id);

            if (productIndex === -1) {
                throw new Error('Product not found');
            }

            const existingProduct = products[productIndex];
            const updatedProduct = { ...existingProduct, ...productUpdated, id: existingProduct.id };

            products[productIndex] = updatedProduct;

            await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return updatedProduct;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    deleteProduct = async (id) => {
        try {
            let products = await this.readProducts();
            const newProducts = products.filter(p => {
                return p.id != id
            });
        
            if (products.length === newProducts.length) {
                throw new Error('Product not found');
            }
            
            await fs.writeFile(this.path, JSON.stringify(newProducts, null, '\t'));
            return { message: 'Product deleted successfully' };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default ProductsManagerFs;