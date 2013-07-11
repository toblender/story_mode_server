'use strict';
//Only access 
exports.createGame = function(req,res,db){

    var game = req.body;
    //add the shortName as the primary key
    req.body.shortName = req.params.name;
    console.log('Creating game.');
    var gameTable = db.get(req.params.name);

    //TODO Check if database has been created
        //Success: do nothing
        //Error: create the database
    gameTable.drop(); //clearing stuff out for now
    gameTable.insert(req.body);
    console.log('Done creating game.');
}


exports.createScene = function(req,res,db){
    //Find the game to add a scene to
        //Then add it
    var gameTable = db.get(req.params.name);
    var queryKey ='shortName';
    var queryValue = req.params.name;
    var valueToInsert =req.body;
    console.log('Creating new scene for: '+queryValue+req.body);
    gameTable.update({queryKey:queryValue},{$push:{'scenes':valueToInsert}});
    console.log('Done creating new scene for: '+queryValue);
}


