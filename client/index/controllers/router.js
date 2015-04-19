App.module('Controllers', function(Controllers, App, Backbone, Marionette) {

	Controllers.Router = Backbone.Marionette.AppRouter.extend({
	    appRoutes: {
	        '#': 'home',
	    }
	});

});