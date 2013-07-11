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
    //Find the game to add a scene to
        //Then add it
    var gameTable = db.get(req.params.name);
    var gameName = req.params.name;
    var sceneInfo =req.body;
    console.log('Creating new scene for: '+gameName);
    gameTable.update({shortName:gameName},{$push:{scenes:sceneInfo}},HandleResponse);
    console.log('Done creating new scene for: '+gameName);
}


