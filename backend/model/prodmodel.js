let mongoose=require("mongoose")
let prodsch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "cat":String,
    "price":String,
    "disc":String,
    "pimg":String,
    "restaurantId":String,
    "rating":String,
    "comm":[{"name":String,"text":String,"rt":Number}]

})
let pm=mongoose.model("pm",prodsch)
module.exports=pm