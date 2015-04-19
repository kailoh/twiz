App.module('Controllers', function(Controllers, App, Backbone, Marionette) {

	Controllers.Controller = Backbone.Marionette.Controller.extend({
		initialize: function() {
			App.vent.trigger('app:log', 'Controller: initializing');
			this.home();
		},
		home: function() {
			App.vent.trigger('app:log', 'Controller: home');
		    this.renderFlightsView();
		},
		renderFlightsView: function(view) {
			App.vent.trigger('app:log', 'Controller: renderFlightsView');
			var view = new App.Views.FlightCollectionView({ collection: window.App.data.flights });
		},
	});
	
});
