export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
};

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (res.statusCode != 404) {
    //res.statusCode = statusCode;
  }
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
