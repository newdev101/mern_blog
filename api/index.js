import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();


//todo%%%%%%%%%% Database connection %%%%%%%%%%%%%
mongoose
.connect(process.env.mongo_uri)
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))


//todo%%%%%%%%%% server connection %%%%%%%%%%%%%
const PORT = 3000;
const app = express();

//todo%%%%%%%%%% Middlewares %%%%%%%%%%%%%
app.use(express.json());

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

//todo%%%%%%%%%% handling errors %%%%%%%%%%%%%
app.use((err, req, res, next)=>{
     const statusCode = err.statusCode || 500;
     const message = err.message || 'Internal Server Error';    
     res.status(statusCode).json({
          success: false,
          statusCode,
          message,
     });
})

app.listen(PORT, () => console.log(`server started on PORT:${PORT}`));

