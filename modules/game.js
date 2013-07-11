'use strict';
//Only access 
exports.createGame = function(req,res,db){

    var tempJSON = {
        shortName:req.params.name,
        longName:'Godly Game',
        scenes: [
        {
            frames: [
                [
                    {
                        style: "top:171px;left:257px;height:200px;width:300px;z-index:0;background:#d7103a;background-image:url('');",
                        type: 'character',
                        id: 'actor-0-1',
                        contents: 'Savedcharacter'
                    },
                    {
                        style: "top:40px;left:417px;height:50px;width:300px;z-index:2;background:#22b159;background-image:url('');",
                        type: 'timer',
                        id: 'actor-1-2',
                        contents: 'Savedtimer'
                    },
                    {
                        style: "top:426px;left:92px;height:200px;width:600px;z-index:0;background:#a94bc3;background-image:url('');",
                        type: 'textbox',
                        id: 'actor-2-3',
                        contents: 'Savedtextbox'
                    },
                    {
                        value: 'soundfile.midi',
                        type: 'sound'
                    }
                ]
            ]
        }
        ]
    }

    var game = req.body;
    console.log('Adding game: ' + JSON.stringify(tempJSON));
    var gameTable = db.get(req.params.name);

    //TODO Check if database has been created
        //Success: do nothing
        //Error: create the database
    gameTable.drop(); //clearing stuff out for now
    gameTable.insert(tempJSON);
}


exports.createScene = function(req,res,db){
    //Find the game to add a scene to
        //Then add it
    var gameTable = db.get(req.params.name);
    var queryKey ='shortName';
    var queryValue = req.params.name;
    var valueToInsert =req.body;
    gameTable.update({queryKey:queryValue},{'$push':{'scenes':valueToInsert}});
}


