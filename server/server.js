import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const port = process.env.PORT || 4000;

await connectDB(); // Connect to the database
await connectCloudinary();

//Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware to parse JSON bodies
app.use(express.json());// All request coming to the server will be parsed as JSON

app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({ origin: allowedOrigins, credentials: true })); // CORS configuration


app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});