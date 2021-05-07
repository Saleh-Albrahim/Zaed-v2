const ErrorResponse = require('../utils/errorResponse');
const OfferModel = require('../models/OfferModel');
const UserModel = require('../models/UserModel');
const asyncHandler = require('../middleware/async');
const ms = require('ms');


// @desc    Return the Offer List
// @route   GET /offer/all
// @access    Public
exports.getOffersList = asyncHandler(async (req, res, next) => {

  // Get  offers List
  const offers = await OfferModel.find();

  res.json(offers);
});

// @desc    Return the Offer List
// @route   GET /offer/:id
// @access    Public
exports.getOffer = asyncHandler(async (req, res, next) => {

  const id = req.id;

  // Check if the title and at least  2 options is sent with the request
  if (!id) {
    return next(new ErrorResponse('الرجاء إرسال رقم الطلب', 400));
  }

  // Find the offer from the id 
  const offer = await OfferModel.findById(id);

  // Check if offer exist on the database of not 
  if (!offer) {
    return next(new ErrorResponse('لا يوجد طلب بهذا الرقم', 400));
  }

  res.json(offer);
});

// @desc    Add new offer
// @route   POST /offer
// @access    Public
exports.addOffer = asyncHandler(async (req, res, next) => {

  const { title, city, imageList, type, notes } = req.body;

  // Check if the required data is sent with the request
  if (!title || !!city || !imageList || !type || !notes) {
    return next(new ErrorResponse('الرجاء إرسال جميع المتطلبات', 400));
  }


  // Create new offer
  const newOffer = await OfferModel.create(req.body);

  // Check if the offer added 
  if (!newOffer) {
    return next(new ErrorResponse('لم يتم إضافة الطلب .. الرجاء المحاولة في وقت اخر', 500));
  }

  res.json({
    message: 'تم إضافة الطلب بنجاح'
  });
});




