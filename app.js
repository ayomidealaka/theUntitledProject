const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
//serve static file
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Global Middleware.
app.use((req, res, next) => {
  console.log('Hello from the middleware!!!');
  next();
});

app.use((req, res, next) => {
  //Prints date and time.
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
