var express = require("express")
var app = express()
var path = require("path")
var bodyparser = require("body-parser")
var mongoose =  require("mongoose")
const { response } = require("express")
var port = process.env.port||3000
var db = require("./config/database")
const { runInNewContext } = require("vm")
var playerName;
app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())

mongoose.connect(db.mongoURI,{
    useNewURLParser:true 
}).then(function(){
    console.log("Connect to MongoDB Database")
}).catch(function(err){
    console.log(err)
})

require("./models/Game")
var Player = mongoose.model("Listplayer")

console.log("working")

app.get("/", function(req, res){
    res.redirect("listplayers.html");
})

app.get("/getPlayers",function(req,res){
    Player.find({}).then(function(listplayers){
        //console.log({game})
        res.json({listplayers})
    })
})

app.get("/unity", function(req,res){
    console.log("Hello from Unity");
    Player.find({}).then(function(listplayers)
        {
            console.log(listplayers)
            for(var i = 0 ; i < listplayers.length; i++)
            {
                
                console.log(listplayers[i].name.length)
                console.log(playerName.split(" "))
                console.log(listplayers[i].name === "PlayerNameenter")
                
                if(listplayers[i].name == playerName)
                {
                    console.log("yes")
                    console.log(listplayers[i].name)
                    var dataToSend = {
                        "name":listplayers[i].name,
                        "timesplayed": listplayers[i].timesplayed,
                        "score":listplayers[i].score
           
           
                   }
                   
                   res.send(dataToSend)   
                }
            }
        })
        });

app.post("/unitySave", function(req,res){
    console.log("Hello from Unity");
   
    //console.log(newData);
    new Player(req.body).save().then(function(){
            console.log(req.body)
            //res.send(req.body)
    })
    


});

app.post("/postUnityDelete",function(req,res){
    console.log("request made")  
      Player.find({"name": req.body.user}).then(function(player){
        console.log(player)
        Player.findByIdAndDelete(player).exec() 
      }) 
})
app.post("/postUnityEdit",function(req,res){
    console.log("request made")  
      Player.find({"name": req.body.user}).then(function(player){
        console.log(player)
        Player.findByIdAndUpdate(player,req.body).exec() 
      }) 
})
app.get("/sortUnityList",function(req,res){
    console.log("request made")
    Player.find().sort({name : 1}).then(function(player)
    {
        console.log({player})
        res.send({player})
    })
})
app.post("/getUnitySearch", function(req,res){
    console.log("request made");
    console.log(req.body)
    console.log(req.body.name)
    Player.find({"name": req.body.name}).then(function(listplayers){
        var playerData = listplayers;
        //console.log(listplayers);
        //console.log(playerData)
        
        console.log(playerData[0].name)
       // playerName = req.body.name;  
        
        var dataToSend = {
            "name":req.body.name,
            "timesplayed": req.body.timesplayed,
            "score":req.body.score


       }
       
       res.send(dataToSend)   
    })
})

app.use(express.static(__dirname+"/pages"))
app.listen(port, function(){
    console.log(`Running on port ${port}`)

})