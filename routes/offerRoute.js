const express = require('express');
const router = express.Router();

// Controllers 
const { getMainView } = require('../controllers/mainController');




router.get('/all', getMainView);

router.get('/', getMainView);


module.exports = router;
