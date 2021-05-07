const express = require('express');
const router = express.Router();

// Controllers 
const { getOffersList, getOffer } = require('../controllers/offerController');




router.get('/all', getOffersList);

router.get('/:id', getOffer);


module.exports = router;
