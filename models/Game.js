var mongoose = require("mongoose")
var playSchema = mongoose.Schema

var Schema = mongoose.Schema
var playSchema = new Schema({
    
        name:String,
        timesplayed:String,
        score:String
    
})


//mongoose.model("game", Schema)
mongoose.model("Listplayer",playSchema)
