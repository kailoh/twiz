App.on('before:start', function(){
	App.vent.trigger('app:log', 'App: Initializing');
	App.views = {};
	App.data = {};
	
	google.load('visualization', '1.0', {'packages':['corechart', 'table']});

	google.setOnLoadCallback(loadFlights);
});

function loadFlights() {
	var flights = new App.Models.FlightCollection();
	flights.fetch({
		success: function() {
			App.data.flights = flights;
			App.vent.trigger('app:log', 'App: Fetched flights successfully');
			App.vent.trigger('app:start');
		}
	})
}

App.vent.bind('app:log', function(msg) {
    console.log(msg);
});

App.vent.bind('app:start', function(){
    App.vent.trigger('app:log', 'App: Starting');
    if (Backbone.history) {
        App.vent.trigger('app:log', 'App: Backbone.history starting');
        App.controller = new App.Controllers.Controller()
        App.router = new App.Controllers.Router({ 
        	controller: App.controller
        });
        Backbone.history.start();
    }
    App.vent.trigger('app:log', 'App: Done starting and running!');
});


App.start();