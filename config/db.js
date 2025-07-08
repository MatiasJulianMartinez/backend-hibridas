import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Uso la URI de MongoDB Atlas desde el archivo .env
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB Atlas exitosa ✅');
    } catch (error) {
        console.error('Error al conectar a MongoDB ❌', error);
        process.exit(1);
    }
};

export default connectDB;
