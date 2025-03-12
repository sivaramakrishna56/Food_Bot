let mongoose = require("mongoose")
let usch = new mongoose.Schema({
    "_id":String,
    "name":String,
    "phno":String,
    "pwd":String,
    "role":{
        type:String,
        default:"user"
    }
})
let um = mongoose.model("user",usch)
module.exports = um