var express = require('express');
var app = express();
var apiRouter = express.Router();
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var morgan = require('morgan');

mongoose.Promise = require('bluebird');

//Connect to mongoose
mongoose.connect(config.database);

// APP CONFIGURATION
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console 
app.use(morgan('dev'));


//Middleware
apiRouter.use(function(req, res, next){
	console.log('Somebody just came to our app!');
	next();
});

// ROUTES FOR OUR API
// ======================================

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

// ROUTES FOR ARTICLE
var articleRouter = require('./app/Routes/articleRoutes')(app,express);
var topicRouter = require('./app/Routes/topicRoutes')(app,express);

// REGISTER OUR ROUTES
app.use('/api', topicRouter);

app.listen(config.port);
console.log('Magic happens on port ' + config.port);