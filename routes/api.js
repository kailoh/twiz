/*
	This is the router for the /api segment
*/

var flights = require('../controllers/flights'),
	express = require('express');

var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next){
	console.log('Time: ', Date.now());
	next();
})

router.get('/flights', flights.getCollection);
router.post('/flights', flights.create);

module.exports = router;