import express  from 'express';
import cors from 'cors';
import router from './routes/index.js';
import mongoose from './db/index.js';

const app =  express();
const PORT = process.env.PORT || 8000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connectin Error"));
db.once("open" , () => console.log("Db connected!"));

app.use(express.json());
app.use(cors());

app.use('/api' , router);

app.listen(PORT, () => console.log(`Sever is running on ${PORT}`))