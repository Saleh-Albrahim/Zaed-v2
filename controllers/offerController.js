const ErrorResponse = require('../utils/errorResponse');
const OfferModel = require('../models/OfferModel');
const UserModel = require('../models/UserModel');
const asyncHandler = require('../middleware/async');
const ms = require('ms');


// @desc    Return the Offer List
// @route   GET /offers
// @access    Public
exports.getPollResult = asyncHandler(async (req, res, next) => {

  const id = req.params.id;

  // No id with sent with the request
  if (!id) {
    return next(new ErrorResponse('الرجاء ارسال جميع المتطلبات', 400));
  }


  // Get the poll from the id
  const poll = await PollModel.findById(id).select('+adminID');

  // No poll with the given id
  if (!poll) {
    return next(new ErrorResponse('الصفحة المطلوبة غير موجودة', 404));
  }

  const cookie = await cookieIsAdmin(req, poll);
  const login = await loginIsAdmin(req, poll);


  // Check if you need to vote before access the result
  if (poll.hidden != 0) {

    // Get the clint ip address
    const ip = await getIpAddress(req);
    if (poll.hidden == 1) {
      // Check if the user in the database
      // Or it's the poll admin
      // If either false redirect to the vote page
      if (!await AddressModel.getAddress(ip, id)) {
        if (!cookie && !login) {
          return res.redirect('/' + id);
        }
      }
    }
    else {
      if (!cookie && !login) {
        return next(new ErrorResponse('لا يمكن الإطلاع على النتائج في هذا التصويت', 401));
      }
    }

  }
  // If user request answers 
  if (poll.question && (cookie || login)) {
    const question = await QuestionsModel.findOne({ _id: poll._id, adminID: poll.adminID });
    poll.answers = question.answers;
  }

  // Sort the options so the most votes become the first result to appear
  poll.options.sort((a, b) => b.voteCount - a.voteCount);

  // Add percentage to each option
  await poll.addPercentageToOptions();



  poll.admin = cookie || login;

  // Add the poll url to the result to make it easy to copy it
  const pollUrl = req.protocol + '://' + req.hostname + '/' + id;

  poll.pollUrl = pollUrl;


  res.render('resView', { poll });
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



