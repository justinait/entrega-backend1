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
    addProductToCart = async (cid, pid) => {
        try {
            //5/product/1
            //agarras el cart
            //le cargas su product.id al arreglo del cart cid
            //product.quantity = 1
            
            //ya tenes el carrito creado con el numero de carrito y
            //un array vacio para los productos, q va a tener (un objeto con 2 valores)x

            const carts = await this.readCarts()
            const cartIndex = carts.findIndex(e => e.id == cid);
            if (cartIndex === -1) throw new Error('Cart not found');
            
            let selectedCart = carts[cartIndex].products;
            
            const productCartIndex = selectedCart.findIndex(e => e.product == pid)
            if(productCartIndex === -1){
                selectedCart = {
                    "product": pid,
                    "quantity": 1
                }
            } else {        //si ya existe ese producto dentro del carrito de este user
                selectedCart[productCartIndex].quantity += 1;
            }
            await fs.writeFile(this.path, JSON.stringify(carts, null, '\t'))
            return carts[cartIndex]

        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
export default CartsManagerFs;