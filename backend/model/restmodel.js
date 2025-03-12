let mongoose = require("mongoose")
let rsch = new mongoose.Schema({
    "_id":String,
    "name":String,
    "pwd":String,
    "pan":String,
    "fssai":String,
    "rimg":String,
    "location":String,
    "role":{
        type:String,
        default:"rowner"
    }
})
let rm = mongoose.model("rest",rsch)
module.exports = rm