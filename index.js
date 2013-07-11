'use strict';

var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/ProgrammerRPG');
var app = new express();

app.use(express.bodyParser());

var auth = require('./modules/authenticate');
var game = require('./modules/game');


//TODO set up https
//TODO do authentication

//Load and serve static files from public
app.use(express.static(__dirname + '/app'));

app.post('/create/game/:name', function(req,res) {
    game.createGame(req,res,db);
    //auth.user(req,res);
    res.json({newGame:'created for '+req.params.name});
});

app.post('/create/game/:name/create/scene', function(req,res) {
    game.createScene(req,res,db);
    //auth.user(req,res);
    res.json({newScene:'created for '+req.params.name});
});



/*
var collectionName = "Game1";
//Setup routing
//Root route
//get() takes 2 parameters, string and function
//req has query string, session, headers
//res is object with output results
app.get('/',function(req,res){
	db.driver.admin.listDatabases(function(e,dbs){
		res.json(dbs);
	})
})

//Express supports verbs like get and post
//Middleware functions have up to 4 parameters
//		err,req,res,next
//You can chain on the get,
//		.get('route',function1,function2,functionN)
app.get('/collections',function(req,res){
	db.driver.collectionNames(function(e,names){
		res.json(names);
	})
});

app.get('/collections/:name',function(req,res){
	var collection = db.get(req.params.name);
	collection.find({},{limit:20},function(e,docs){
		res.json(docs);
	})
});

app.get('/books',function(req,res){
	var collection = db.get(collectionName)
	collection.find({},{limit:20},function(e,docs){
		res.json(docs);
	})
});

app.get('/books/:name',function(req,res){
	var collection = db.get(collectionName);
	collection.find({'name':req.params.name},{limit:20},function(e,docs){
		res.json(docs);
	})
});
*/

app.listen(3000);
