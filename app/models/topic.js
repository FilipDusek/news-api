var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');

// Topics Schema
// The Schema isn't required for our database it is just for the application

//passing in object with all fields that we want except for the ID since that is automatically generated
var TopicSchema = new Schema({
	name:{
		type: String,
		//we want this to be required so we can add validation ass well from here
		//required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

//Makes Topic  object accessible from anywhere else
var Topic = module.exports = mongoose.model('Topic', TopicSchema);



