import { Schema, model } from "mongoose";
const productCollection = 'products'

const productSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnails: {
        type: String,
        required: true
    },
})

export const productModel = model(productCollection, productSchema);