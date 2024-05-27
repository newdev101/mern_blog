import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
.connect(process.env.mongo_uri)
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))

const PORT = 3000;
const app = express();
app.listen(PORT, () => console.log(`server started on PORT:${PORT}`));

