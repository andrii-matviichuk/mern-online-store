import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401);
    throw Error('Please login to access this page!');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(401);
    throw Error('Invalid token. Please log in again!');
  }

  const freshUser = await User.findById(decoded.id).select(
    '-password -__v -passwordChangedAt'
  );

  if (!freshUser) {
    res.status(401);
    throw Error(
      'This user is no longer exists. Please sign up or log in with a new account!'
    );
  }

  if (freshUser.isPasswordChangedAfter(decoded.iat)) {
    res.status(401);
    throw Error('Your password has been changed! Please log in again!');
  }

  req.user = freshUser;
  next();
});
