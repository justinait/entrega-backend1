import { Schema, model } from "mongoose";
const userCollection = 'users'
const userSchema = new Schema({
    first_name:  {
        type: String,
        required: true
    },
    last_name:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
})

export const userModel = model(userCollection, userSchema);