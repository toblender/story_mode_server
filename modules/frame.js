'use strict';

function HandleResponse(err,doc){
    //This a little piggy will give me the errors
    if(err){
        console.log("Found an error while running Query: "+err);
    }else{
        console.log("Sweet, query ran, updated:"+doc);
    }
}

//Create
exports.create = function(req,res,db){
    //Find the game to add a scene to
        //Then add it
    var gameName = req.params.name;
    var gameCollection= db.get(gameName);
    var sceneNumber = req.params.scene;
    //TODO Only capture frame Info for now
    var frameInfo=req.body.frameInfo;
    console.log('Creating new frame for: '+gameName+" scene: "+sceneNumber);
   
    //TODO generalize this to push obj 
    var frameObj = {};
    frameObj['scenes.'+sceneNumber+'.frames']=frameInfo;
    gameCollection.update({shortName:gameName},{$push:frameObj},HandleResponse);
    console.log('DONE: Creating new frame for: '+gameName+" scene: "+sceneNumber);
}

//Read


//Update
exports.update = function(req,res,db){
    //Get the game database
    //Call $set on internal element
    var gameName = req.params.name;
    var gameCollection = db.get(gameName);
    var sceneNumber = 'scenes.'+req.params.scene;
    var frameNumber= 'frames.'+req.params.frame;
    var frameInfo= req.body.frameInfo;
    console.log('Updating frame for: '+gameName+" scene: "+frameNumber);
    //Away around it is to make obj ahead of time then pass that info the value area
    //gameCollection.update({shortName:gameName},{$set:{'scenes.'+req.params.number:sceneInfo}},HandleResponse);
    
    var frameObj= {};
    frameObj[sceneNumber+'.'+frameNumber]=frameInfo;
    gameCollection.update({shortName:gameName},{$set:frameObj},HandleResponse);
    console.log('DONE: Updating frame for: '+gameName+" scene: "+frameNumber);
}



//Delete
exports.drop = function(req,res,db){
    var gameName = req.params.name;
    var gameCollection = db.get(gameName);
    var sceneNumber = 'scenes.'+req.params.scene;
    var frameNumber= 'frames.'+req.params.frame;
    console.log('Drop frame for: '+gameName+" scene: "+frameNumber);
    var unsetObj ={}
    unsetObj[sceneNumber+'.'+frameNumber]='';
    var pullObj ={}
    pullObj[sceneNumber+'.'+'frames']=null;
    gameCollection.update({shortName:gameName},{$unset:unsetObj},HandleResponse);
    //Pulling may cause the site to slow down, as it's resizing, might be best to be null for now
    gameCollection.update({shortName:gameName},{$pull:pullObj},HandleResponse);
    console.log('DONE: Drop frame for: '+gameName+" scene: "+frameNumber);
}

//TODO Reorder
    //Get pull all scenes, reorder according to new order
    //Put them back
