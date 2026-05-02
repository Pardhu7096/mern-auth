 import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoute from './routes/userRoute.js';  
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database');
}).catch((error)=>{
     console.log("REGISTER ERROR:", error.message);
})
app.use('/api/user', userRoute);

app.get('/', (req,res)=>{
    res.send('hello world backend pretty basics')
});


app.listen(5000, ()=>{
    console.log('Server running on port 5000');
})