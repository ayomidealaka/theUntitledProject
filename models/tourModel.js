const mongoose = require('mongoose');
const slugify = require('slugify');

//Schema Descriptions/Model.
const newSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Must have a name'],
      unique: true,
      trim: true,
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

const Tour = mongoose.model('Tour', newSchema);

module.exports = Tour;
