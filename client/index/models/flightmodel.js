App.module('Models', function(Models, App, Backbone, Marionette) {

	Models.FlightModel = Backbone.Model.extend({
	    idAttribute: '_id',
	});

	Models.FlightCollection = Backbone.Collection.extend({
	    model:  Models.FlightModel,
	    url: '/api/flights'
	});

});