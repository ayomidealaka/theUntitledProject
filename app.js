const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
//serve static file
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  //Prints date and time.
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Middleware to handle unhandled routes.
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `cannot find ${req.url} on this server`,
  });
});

module.exports = app;
