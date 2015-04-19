/*
	This is the router for pages from the root
*/

var flights = require('../controllers/flights'),
	express = require('express');

var router = express.Router();

router.get('/index', flights.index);
router.get('/cover', flights.cover);


module.exports = router;