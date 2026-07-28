import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import studentRouter from './routes/studentRoutes.js';
import bookRouter from './routes/bookRoutes.js';


const PORT = process.env.PORT || 5000;
const app = express();

//MiddleWares
app.use(cors());
app.use(express.json());

//DB
connectDB();

//Routes
app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);
app.use('/api/books', bookRouter);


app.get("/", (req,res)=>{
    res.send("API Working");
})

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});