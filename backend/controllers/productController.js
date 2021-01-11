import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

export const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);

  res.status(404);
  throw Error('Product with that id not found!');
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
