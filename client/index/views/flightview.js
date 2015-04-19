App.module('Views', function(Views, App, Backbone, Marionette) {

	Views.FlightCollectionView = Backbone.Marionette.CollectionView.extend({
		initialize: function() {
			App.vent.trigger('app:log', 'FlightCollectionView: initializing');

			var myModels = this.collection.models;
        		// Create the data table.
        	var data = new google.visualization.DataTable();
        	data.addColumn('string', 'origin');
        	data.addColumn('datetime', 'departureDate');
        	data.addColumn('string', 'destination');
        	data.addColumn('datetime', 'arrivalDate');
        	data.addColumn('number', 'duration');
        	data.addColumn('number', 'distance');
        	data.addColumn('string', 'airline');
        	data.addColumn('number', 'price');
        	data.addColumn('number', 'rewards');
        	data.addColumn('number', 'carbon');

        	for (var i=0; i<myModels.length; i++) {
        		data.addRow([myModels[i].attributes.origin, 
        			new Date(myModels[i].attributes.departureDate.substring(0,22)),
        			myModels[i].attributes.destination,
        			new Date(myModels[i].attributes.arrivalDate.substring(0,22)),
        			myModels[i].attributes.duration,
        			myModels[i].attributes.distance,
        			myModels[i].attributes.airline,
        			myModels[i].attributes.price,
        			myModels[i].attributes.rewards,
        			myModels[i].attributes.carbon,])
        	}

        	// Set chart options
        	var options = {'title':'MyChart',
        	'width':800,
        	'height':300};

        	// Instantiate and draw our chart, passing in some options.
        	var chart = new google.visualization.Table(document.getElementById('chart_1'));
        	chart.draw(data, options);

        	var data = new google.visualization.DataTable();
        	data.addColumn('string', 'destination');
        	data.addColumn('number', 'price');

        	for (var i=0; i<myModels.length; i++) {
        		data.addRow([myModels[i].attributes.destination, 
        			myModels[i].attributes.price,])
        	}

        	// Set chart options
        	var options = {'title':'MyChart2',
        	'width':800,
        	'height':300};

        	// Instantiate and draw our chart, passing in some options.
        	var chart2 = new google.visualization.PieChart(document.getElementById('chart_2'));
        	chart2.draw(data, options);

        },

    });
});
