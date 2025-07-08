import express from "express";
import dotenv from "dotenv";
import routerAPI from "./routes/index.js";
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenido/a a la API REST</h1>');
});

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

routerAPI(app);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
