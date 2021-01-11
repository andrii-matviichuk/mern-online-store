import express from 'express';
import productRouter from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import { notFound, globalErrorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// Mounting routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

// Handling request to unused routes
app.all('*', notFound);

app.use(globalErrorHandler);

export default app;
