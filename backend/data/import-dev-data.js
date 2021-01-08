import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import products from './products.js';
import users from './users.js';

dotenv.config();

const DB = process.env.DATABASE_CONNECTION.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<USERNAME>', process.env.DATABASE_USERNAME);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection was successfull'))
  .catch((err) => console.log('Failed to connect to database: ', err));

const importData = async () => {
  try {
    const adminUser = (
      await User.create(users, {
        validateBeforeSave: false,
      })
    )[0]._id;

    const sampleProducts = products.map((prod) => {
      return { ...prod, user: adminUser };
    });

    await Product.create(sampleProducts);
    console.log('Data succesfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data succesfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
