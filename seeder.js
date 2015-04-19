var mongoose = require('mongoose'),
flight = require('./models/flight');

module.exports = {
	/* Check if the db is empty */
	check : function() {
		// Listings
		flight.Flight.find({}, function(err, listings){
			if (listings.length === 0) {
				
				console.log('No listings found; Seeding...');
				// dummy listing 1
				var newFlight = new flight.Flight({
					origin: 'SEA', //airport code
					destination: 'NYC', //airport code
					distance: 7000, //distance in miles
					price: 400 , //price of flight
					carbon: 1800, //carbon emissions
					departureDate: new Date(2014, 12, 23, 8, 00, 00, 00),
					arrivalDate: new Date(2014, 12, 23, 14, 00, 00, 00),
					duration: 360, //in # of minutes
					airline: 'American Airlines', //name of airline
					rewards: 5000, //# of reward miles
				});
				newFlight.save(function(err, addedFlight){
					console.log('Successfully inserted flight: ' + addedFlight._id);
				});

				var newFlight1 = new flight.Flight({
					origin: 'SEA', //airport code
					destination: 'BOS', //airport code
					distance: 7400, //distance in miles
					price: 350 , //price of flight
					carbon: 2000, //carbon emissions
					departureDate: new Date(2014, 12, 25, 8, 00, 00, 00),
					arrivalDate: new Date(2014, 12, 25, 14, 00, 00, 00),
					duration: 360, //in # of minutes
					airline: 'Southwest Airlines', //name of airline
					rewards: 4000, //# of reward miles
				});
				newFlight1.save(function(err, addedFlight){
					console.log('Successfully inserted flight: ' + addedFlight._id);
				});

				var newFlight2 = new flight.Flight({
					origin: 'SEA', //airport code
					destination: 'LAX', //airport code
					distance: 2400, //distance in miles
					price: 150 , //price of flight
					carbon: 500, //carbon emissions
					departureDate: new Date(2014, 12, 14, 8, 00, 00, 00),
					arrivalDate: new Date(2014, 12, 14, 10, 00, 00, 00),
					duration: 120, //in # of minutes
					airline: 'Alaska Airlines', //name of airline
					rewards: 2400, //# of reward miles
				});
				newFlight2.save(function(err, addedFlight){
					console.log('Successfully inserted flight: ' + addedFlight._id);
				});


			} else {
				console.log('Found ' + flight.Flight.length + ' existing flights');
			}
		});
		
	}
}
