import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config();


//todo%%%%%%%%%% Database connection %%%%%%%%%%%%%
mongoose
.connect(process.env.mongo_uri)
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))


//todo%%%%%%%%%% server connection %%%%%%%%%%%%%
const PORT = 3000;
const app = express();

app.use('/api/user',userRoutes)

app.listen(PORT, () => console.log(`server started on PORT:${PORT}`));

