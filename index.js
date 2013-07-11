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
    res.json({newScene:'created for '+req.params.name});
});

app.listen(3000);
