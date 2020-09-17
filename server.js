const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Handles uncaught exception in application.
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!!!');
  console.log('Server shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//connect mongoose.
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

//Hanldes unhandled rejection in server.
process.on('unhandledRejection', (err) => {
  console.log('UNCAUGHT REJECTION!!!');
  console.log('Server shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
