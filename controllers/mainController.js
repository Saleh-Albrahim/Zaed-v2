const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const cities = require('../data/cities.json');

// @desc    Return the Main page message
// @route   GET /
// @access    Public
exports.getMainMessage = asyncHandler(async (req, res, next) => {
  res.json('Hello World');
});


// @desc    Return the Types List
// @route   GET /types
// @access    Public
exports.getTypesList = asyncHandler(async (req, res, next) => {
  res.json('Types List');
});

// @desc    Return the Cities List
// @route   GET /cities
// @access    Public
exports.getCitiesList = asyncHandler(async (req, res, next) => {
  res.json(cities);
});

