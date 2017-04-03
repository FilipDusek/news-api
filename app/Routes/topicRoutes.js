var Topic = require('../models/topic');
module.exports = function(app,express){
	var apiRouter = express.Router();


//Routes for  Topic
//=======================================
apiRouter.route('/topics')
	.post(function(req,res){
		var topic =new Topic();
		
		topic.name =req.body.name;
		
		topic.save(function(err){
			if(err)
			{
				if(err) res.send(err);				
			}
			res.json({message: 'Topic created!'});
		});
	})

	.get(function(req,res){
		Topic.find(function(err, topics){
			if(err) res.send(err);
			res.json(topics);
		});
	});

apiRouter.route('/topics/:topic_id')
		.get(function(req,res){
			Topic.findById(req.params.topic_id, function(err,topic)
			{
				if(err) res.send(err);
				res.json(topic);
			});
		})
		.put(function(req,res){
			Topic.findById(req.params.topic_id, function(err,topic)
			
			{
				if(err) res.send(err);

				if(req.body.name) topic.name =req.body.name;
				

				topic.save(function(err){
					if(err) res.send(err);
					
					res.json({message:'Topic updated'});
					
				});
			});
		})
		.delete(function(req,res){
			Topic.remove({
				_id: req.params.topic_id
			}, function(err,topic){
				if(err) return res.send(err);
				
				res.json({message:'Successfully deleted'});
			
			});
		});

		return apiRouter;
	};