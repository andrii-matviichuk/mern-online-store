import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createAndSendToken = (user, statusCode, req, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    //secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw Error('Please provide email and password!');
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.isCorrectPassword(password))) {
    res.status(401);
    throw Error('Incorrect email or password!');
  }
  createAndSendToken(user, 200, req, res);
});

export const getUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.status(400);
    throw Error('Please provide name, email and password!');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw Error(
      'User with this email is already registered! Please log in or use another email!'
    );
  }

  const user = await User.create({ name, email, password });

  if (user) {
    createAndSendToken(user, 201, req, res);
  } else {
    res.status(401);
    throw Error('Invalid input data!');
  }
});
