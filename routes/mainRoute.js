const express = require('express');
const router = express.Router();
const { getMainMessage, getTypesList, getCitiesList } = require('../controllers/mainController');


router.get('/', getMainMessage);

router.get('/types', getTypesList);

router.get('/cities', getCitiesList);

module.exports = router;
