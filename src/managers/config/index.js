import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://justiiturraspe:justina123@oliva.ce3of.mongodb.net/mibasededatos?retryWrites=true&w=majority&appName=oliva');
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
};
