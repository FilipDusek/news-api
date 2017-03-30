var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var Article = require('./models/article');

mongoose.connect('mongodb://localhost/articlesdb');

app.use( bodyParser.json() ); 

app.post('/article', function (req, res) {
    var article = new Article();

    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err) {
        if (err) {
            // duplicate entry
            if (err.code == 11000)
                return res.json({
                    success: false,
                    message: 'A user with that username already exists. '
                });
            else
                return res.send(err);
        }
        res.json({ message: 'User created!' });
    });
});

app.get('/article/:author', function (req, res) {
  Article.find({'author': req.params.author}, function (err, docs) {
      res.json(docs);
  });
})

app.delete('/article/:title', function (req, res) {
  Article.find({'title': req.params.title}).remove().exec(function(err, data) {
    res.json({ 'Documents removed': data});
  });
});

app.update('/article/:id', function(req, res){

});

app.get('/article/all', function (req, res) {
	Article.find(function(err, articles) {
		if (err) res.send(err);
		res.json(articles);
	});
});


var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
