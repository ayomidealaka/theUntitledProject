const mongoose = require('mongoose');

//Schema Descriptions/Model.
const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Must have duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Must have group size'],
  },
  difficulty: {
    type: Number,
    required: [true, 'Must have difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: [true, 'Must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Must have n imageCover price'],
  },
  images: [String], //Array Of Strings.
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', newSchema);

module.exports = Tour;
