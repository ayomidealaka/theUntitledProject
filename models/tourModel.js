const mongoose = require('mongoose');

//Schema Descriptions/Model.
const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Must have a price'],
  },
});

const Tour = mongoose.model('Tour', newSchema);

module.exports = Tour;
