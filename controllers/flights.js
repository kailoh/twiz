var flight = require('../models/flight');
var Flight = flight.Flight;

module.exports = {
	getCollection : function(req, res) {
		Flight.find({}, function(err, data){
			res.json(data);
		});
	},

	// get : function(req, res) {
	// 	var flightId = req.params.id;
	// 	Flight.findOne({'_id' : flightId}, function(err, data){
	// 		if (err) return res.status(404).send('Not Found');
	// 		res.json(data);
	// 	});
	// },

	create : function(req, res) {
		var newFlight = new Flight(req.body);
		newFlight.save(function(err, flight){
			console.log('Successfully inserted listing: ' + flight._id);
		});
	},

	index: function(req, res) {
		res.render('index/index', {header: 'Twiz', layout:'index/index-layouts'});
	},

	cover: function(req, res) {
		res.render('cover/cover', {header: 'Twiz', layout:'cover/cover-layouts'});
	}
}