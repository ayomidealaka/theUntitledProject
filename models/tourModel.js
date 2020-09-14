const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

//Schema Descriptions/Model.
const newSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour must have less or equal to 40 characters'],
      minlength: [10, 'Tour must have more or equal than 40 characters'],
      //external library to use for validation. Validator.js
      // validate: [validator.isAlpha, 'Tour name must only contain Characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Must have group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'Must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Diffulty is either Easy, Medium or Difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        //Custom validator.
        validator: function (val) {
          return val < this.price;
        },
      },
      message: 'Discount price should be below regular price',
    },
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
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

newSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Document Middleware (Runs befoere an event). This runs before .save() and .create() event.
newSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// newSchema.pre('save', function (next) {
//   console.log('will save doc');
//   next();
// });

// newSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// // Query Middleware
newSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

// Query Middleware
newSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

newSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds.`);
  next();
});

//Aggregation Middleware
newSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', newSchema);

module.exports = Tour;
