import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Product must have a user'],
    },
    name: {
      type: String,
      required: [true, 'Product must have a name'],
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
      required: [true, 'Product must have a brand'],
    },
    category: {
      type: String,
      required: [true, 'Product must belong to a category'],
    },
    description: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
      },
    ],
    rating: {
      type: Number,
      required: [true, 'Product must have a rating'],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, 'Product must have a numReviews property'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Product must have a price'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Product must have a countInStock property'],
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
