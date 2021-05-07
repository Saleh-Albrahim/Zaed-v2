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




// @desc    Create Poll
// @route   POST /create
// @access    Public
exports.createPoll = asyncHandler(async (req, res, next) => {

  const { title, options, ip, vpn, hidden, question } = req.body;

  // Check if the title and at least  2 options is sent with the request
  if (!title.trim() || options.length < 2) {
    return next(new ErrorResponse('الرجاء ارسال جميع المتطلبات', 400, true));
  }

  // Check if login user created this poll or a guest
  // If guest generate token
  let adminID;

  if (!(req.user || req.cookies.adminID)) {
    adminID = await UserModel.generateAdminToken();
    await createAdminToken(res, adminID);
  }
  else {
    adminID = req.user ? req.user._id : req.cookies.adminID;
  }



  // Create new Poll
  const newPoll = await PollModel.create({
    adminID, title, options: JSON.parse(options),
    ipAddress: ip, vpn: !vpn, hidden, question
  });

  if (hidden != 0 || ip) { await AddressModel.create({ _id: newPoll._id }); }
  if (question) { await QuestionsModel.create({ _id: newPoll._id, adminID }); }


  res.json({
    success: true,
    status: 200,
    id: newPoll.id,
    message: 'تم إنشاء التصويت بـ نجاح'
  });

});

const createAdminToken = async (res, adminID) => {


  const options = {
    expires: new Date(Date.now() + ms('30d')),
    httpOnly: false
  };

  if (process.env.NODE_ENV == 'production') {
    options.secure = true;
  }

  res.cookie('adminID', adminID, options);

};



