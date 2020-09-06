const express = require('express');

const app = express();

app.use(express.json());

//serve static file
// app.use(express.static(`${dirname}/public`))

//Global Middleware.
app.use((req, res, next) => {
  //Prints date and time.
  req.requestTime = new Date().toISOString();
  console.log('Hello from the middleware!!!');
  next();
});

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
