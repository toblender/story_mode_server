'use strict';
//Only access 

function HandleResponse(err,doc){
    //This a little piggy will give me the errors
    if(err){
        console.log("Found an error while running Query: "+err);
    }else{
        console.log("Sweet, query ran, updated:"+doc);
    }
}

exports.create = function(req,res,db){
    console.log('Creating game.');
    
    //add the shortName as the primary key
    var gameInfo = req.body;
    gameInfo.shortName = req.params.name;
    var gameTable = db.get(req.params.name);

    //TODO Check if database has been created
        //Success: do nothing
        //Error: create the database

    gameTable.drop(); //clearing stuff out for now
    gameTable.insert(gameInfo,HandleResponse);
    console.log('Done creating game.');
}

exports.read = function(req,res,db){
    var gameTable = db.get(req.params.name);
    var gameName = req.params.name;
    gameTable.findOne({shortName:gameName},function(err,doc){
        res.send(doc);
    });
}

