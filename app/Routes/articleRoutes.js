var Article = require('../models/articles');
module.exports = function(app,express){
	var apiRouter = express.Router();

//Routes for  Article
//=======================================
apiRouter.route('/articles')
	.post(function(req,res){
		var article =new Article();
		
		article.title =req.body.title;
		article.topic = req.body.topic;
		article.description =req.body.description;
		article.author =req.body.author;
		article.image_url =req.body.image_url;
		
		article.save(function(err){
			if(err)
			{
				if(err) res.send(err);				
			}
			res.json({message: 'Article created!'});
		});
	})

	.get(function(req,res){
		Article.find(function(err, articles){
			if(err) res.send(err);
			res.json(articles);
		});
	});

apiRouter.route('/articles/:article_id')
		.get(function(req,res){
			Article.findById(req.params.article_id, function(err,article)
			{
				if(err) res.send(err);
				res.json(article);
			});
		})
		.put(function(req,res){
			Article.findById(req.params.article_id, function(err,article)
	
			{
				if(err) res.send(err);

				if(req.body.title) article.title =req.body.title;
				if(req.body.description) article.description =req.body.description;
				if(req.body.author) article.author =req.body.author;
				if(req.body.topic) article.topic =req.body.topic;
				if(req.body.image_url) article.image_url =req.body.image_url;


				article.save(function(err){
					if(err) res.send(err);
					
					res.json({message:'Article updated'});
					
				});
			});
		})
		.delete(function(req,res){
			Article.remove({
				_id: req.params.article_id
			}, function(err,article){
				if(err) return res.send(err);
				
				res.json({message:'Successfully deleted'});
			
			});
		});
		// REGISTER OUR ROUTES -------------------------------

		return apiRouter;
	};