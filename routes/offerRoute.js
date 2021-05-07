const express = require('express');
const router = express.Router();
const { getOffersList, getOffer, addOffer } = require('../controllers/offerController');

router.get('/all', getOffersList);

router.get('/:id', getOffer);

router.post('/', addOffer);


module.exports = router;
