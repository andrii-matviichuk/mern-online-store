import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

// DATABASE CONNECTION
const DB = process.env.DATABASE_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<USERNAME>', process.env.DATABASE_USERNAME);

try {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('DATABASE connection was successful!');
} catch (err) {
  console.log('Failed to connect to database', err.message);
  process.exit(1);
}

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${port}`)
);

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection. Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
