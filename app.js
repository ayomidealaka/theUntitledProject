const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

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
  next(new AppError(`cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
