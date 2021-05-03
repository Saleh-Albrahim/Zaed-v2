const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');


// @desc    Render the main page
// @route   GET /
// @access    Public
exports.getMainView = asyncHandler(async (req, res, next) => {
  res.json('Hello World');
});



