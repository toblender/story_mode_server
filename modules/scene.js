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
    var gameName = req.params.name;
    var gameCollection= db.get(gameName);
    var sceneInfo =req.body;
    console.log('Creating new scene for: '+gameName);
    gameCollection.update({shortName:gameName},{$push:{scenes:sceneInfo}},HandleResponse);
    console.log('DONE: creating new scene for: '+gameName);
}

//Read


//Update
exports.update = function(req,res,db){
    //Get the game database
    //Call $set on internal element
    var gameName = req.params.name;
    var gameCollection = db.get(gameName);
    var sceneNumber = 'scenes.'+req.params.number;
    var sceneInfo = req.body;
    console.log('Updating scene for: '+gameName);
    //Away around it is to make obj ahead of time then pass that info the value area
    //gameCollection.update({shortName:gameName},{$set:{'scenes.'+req.params.number:sceneInfo}},HandleResponse);
    
    var setObj= {};
    setObj[sceneNumber]=sceneInfo;
    gameCollection.update({shortName:gameName},{$set:setObj},HandleResponse);
    console.log('DONE: Updating scene for: '+gameName);
}



//Delete
exports.drop = function(req,res,db){
    var gameName = req.params.name;
    var gameCollection = db.get(gameName);
    var sceneNumber = 'scenes.'+req.params.number;
    var pullNull = null;
    console.log('Delete scene for: '+gameName);
    var unsetObj ={}
    unsetObj[sceneNumber]='';
    gameCollection.update({shortName:gameName},{$unset:unsetObj},HandleResponse);
    //Pulling may cause the site to slow down, as it's resizing, might be best to be null for now
    gameCollection.update({shortName:gameName},{$pull:{scenes:pullNull}},HandleResponse);
    console.log('DONE: Delete scene for: '+gameName);
}
