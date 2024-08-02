import { promises as fs } from 'fs';
import { __dirname } from '../dirname.js';
import { join } from 'path';

const path = join(__dirname, 'dbjson', 'carts.json');

class CartsManagerFs {
    constructor(){
        this.carts = [];
        this.path = path;
    }

    readCarts = async () => {
        try {
            const cartsJson = await fs.readFile(path, 'utf-8')
            const cartsJs = JSON.parse(cartsJson);
            if (!Array.isArray(cartsJs)) {
                throw new Error('Carts data is not an array');
            }
            return cartsJs
        } catch (error) {
            return []
        }
    }
    getCarts = async () => {
        return await this.readCarts()
    }
    getCart = async (id) => {
        let carts = await this.readCarts()
        
        const cart = carts.find(e => {
            return e.id == id;
        })
        return cart
    }
    createCart = async () => {
        try {
            let newCart = {}
            const carts = await this.readCarts()
            if(carts.length === 0){
                newCart.id = 1;
            } else {
                newCart.id = carts[carts.length-1].id+1;
            }
            newCart.products = [];
            carts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'))
            return newCart

        } catch (error) {
            console.log(error);
            throw error
        }
    }
    addProductToCart = async (product) => {
        try {
            //agarras el product
            //le cargas su product.id al arreglo del cart cid
            //product.quantity = 1

        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
export default CartsManagerFs;