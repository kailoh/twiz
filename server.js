var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	errorHandler = require('errorhandler'),
	http = require('http'),
	path = require('path'),
	apiRouter = require('./routes/api'),
	exphbs = require('express-handlebars'),
	mongoose = require('mongoose'),
	seeder = require('./seeder'),
	pageRouter = require('./routes/page');

var app = express();

app.set('port', process.env.PORT || 2345);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
	layoutsDir : app.get('views')
}));
app.set('view engine', 'handlebars');


/* This dictates the order of operations for the request handlers */
// left out express.logger('dev') --> need this for production for sure to log http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
// left out express.cookieParser() --> not sure when this will start to be useful
app.use('/', pageRouter);
app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('/api', stormpath.apiAuthenticationRequired, apiRouter);
app.use('/api', apiRouter);

/* Check node environment */
// necessary check because we will set node_env variable in the future
if (app.get('env') == 'development'){
	app.use(errorHandler()); // output to STDERR
}

/* Connect to MongoDB */
mongoose.connect('mongodb://localhost/twiz');
mongoose.connection.on('open', function() {
	console.log('Connected to Mongoose (twiz)...');
	if (app.get('env') == 'development'){
		seeder.check();
	}
});

/* Start server */
app.listen(app.get('port'), function(){
	console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});