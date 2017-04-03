var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
var Topic = require('./topic');
// News Schema
// The Schema isn't required for our database it is just for the application

//passing in object with all fields that we want except for the ID since that is automatically generated
var ArticleSchema = new Schema({
	title:{
		type: String,
		//we want this to be required so we can add validation ass well from here
		//required: true
	},

	topic: String,


	description: {
		type: String,		
		//required: true
	},
	author: {
		type: String,		
		//required: true
	},
	
	image_url: {
	type: String		
	},

	create_date:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Article', ArticleSchema);

//Makes Article  object accessible from anywhere else
//var Article = module.exports = mongoose.model('Article', articleSchema);

//make accessible from outside
//Get articles

//module.exports.getArticles = function(callback, limit){
	//Article.find(callback).limit(limit);
//}

//get artciles by id, findBy Id is a mongoose method
//module.exports.getArticleById = function(id, callback){
	//Article.findById(id, callback);
//}

//Add artcile
//module.exports.addArticle = function(article, callback){
//	Article.create(article, callback);
//}