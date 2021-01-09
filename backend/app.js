import express from 'express';
import productRouter from './routes/productRoutes.js';
import { notFound, globalErrorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Mounting routes
app.use('/api/v1/products', productRouter);

// Handling request to unused routes
app.all('*', notFound);

app.use(globalErrorHandler);

export default app;
