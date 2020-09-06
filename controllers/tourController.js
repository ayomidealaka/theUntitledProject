const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //converts req.params.id to number

  const tour = tours.find(el => el.id === id);
  //Checking if tour is undefined.
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invlaid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour
    }
  });
};
exports.createTour = (req, res) => {};

exports.updateTour = (req, res) => {};

exports.deleteTour = (req, res) => {};
