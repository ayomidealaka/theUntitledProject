const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  //operational error. Trusted error.
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      //error: err, //not meant to be in prod.
      message: err.message,
      //stack: err.stack, //not in be prod.
    });
    console.log(err.message);
    //Programming error from dev team.
  } else {
    console.log('Error 😭!!!', err);

    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log(err.stack);
  console.log(err);
  console.log(err.status);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.create(err);
  let errName = err.name;

  if (errName === 'CastError') {
    error = handleCastErrorDB(error);
  }

  // if (error.code)
  sendErrorProd(error, res);
};
