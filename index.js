'use strict';
var exec = require('child_process').exec;
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

console.log('Story_mode RESTAPI is starting...');

console.log('Starting up mongoDB');
var mongodb_cmd = 'mongod';
exec(mongodb_cmd, function(error, stdout, stderr) {
  // command output is in stdout
});

//TODO set up https
//TODO do authentication

//Load and serve static files from public
app.use(express.static(__dirname + '/app'));

//Game API
app.post('/api/game/create/:name', function(req,res) {
    game.create(req,res,db);
    //auth.user(req,res);
    res.json({newGame:'created for '+req.params.name});
});

app.get('/api/game/read/:name',function(req,res){
    game.read(req,res,db);
});

//Scene API
app.post('/api/scene/create/:name', function(req,res) {
    scene.create(req,res,db);
    //auth.user(req,res);
    res.json({scene:'created for '+req.params.name});
});

app.post('/api/scene/update/:name/:number', function(req,res) {
    scene.update(req,res,db);
    //auth.user(req,res);
    res.json({scene:'updated for '+req.params.name});
});

app.post('/api/scene/drop/:name/:number',function(req,res){
    scene.drop(req,res,db);
    res.json({scene:'dropped for '+req.params.name});
});

//Frame API
app.post('/api/frame/create/:name/:scene',function(req,res){
    frame.create(req,res,db);
    res.json({frame:'created for '+req.params.name});
});

app.post('/api/frame/update/:name/:scene/:frame',function(req,res){
    frame.update(req,res,db);
    res.json({frame:'updated for '+req.params.name+' scene: '+req.params.scene});
});

app.post('/api/frame/drop/:name/:scene/:frame',function(req,res){
    frame.drop(req,res,db);
    res.json({frame:'dropped for '+req.params.name+' scene: '+req.params.scene});
});

//Start to listen to port

//app.listen(3000);
exports = module.exports = app;
console.log('Story_mode RESTAPI is up and at em...');
