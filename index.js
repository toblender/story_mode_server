'use strict';

var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/ProgrammerRPG');
var app = new express();

app.use(express.bodyParser());

var auth = require('./modules/authenticate');
var game = require('./modules/game');
var scene= require('./modules/scene');
var frame= require('./modules/frame');

console.log('ProgrammerRPG RESTAPI up and at them.');
//TODO set up https
//TODO do authentication

//Load and serve static files from public
app.use(express.static(__dirname + '/app'));

//Game API
app.post('/game/create/:name', function(req,res) {
    game.create(req,res,db);
    //auth.user(req,res);
    res.json({newGame:'created for '+req.params.name});
});

app.get('/game/read/:name',function(req,res){
    game.read(req,res,db);
});

//Scene API
app.post('/scene/create/:name', function(req,res) {
    scene.create(req,res,db);
    //auth.user(req,res);
    res.json({scene:'created for '+req.params.name});
});

app.post('/scene/update/:name/:number', function(req,res) {
    scene.update(req,res,db);
    //auth.user(req,res);
    res.json({scene:'updated for '+req.params.name});
});

app.post('/scene/drop/:name/:number',function(req,res){
    scene.drop(req,res,db);
    res.json({scene:'dropped for '+req.params.name});
});

//Frame API
app.post('/frame/create/:name/:scene',function(req,res){
    frame.create(req,res,db);
    res.json({frame:'created for '+req.params.name});
});

app.post('/frame/update/:name/:scene/:frame',function(req,res){
    frame.update(req,res,db);
    res.json({frame:'updated for '+req.params.name+' scene: '+req.params.scene});
});

app.post('/frame/drop/:name/:scene/:frame',function(req,res){
    frame.drop(req,res,db);
    res.json({frame:'dropped for '+req.params.name+' scene: '+req.params.scene});
});

//Start to listen to port

//app.listen(9000);
exports = module.exports = app;
