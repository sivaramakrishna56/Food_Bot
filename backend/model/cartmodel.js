let mongoose=require('mongoose')
let csch=new mongoose.Schema({
    '_id':String,
    'uid':String,
    'pid':String,
    'name':String,
    'qty':Number,
    'price':Number,
    'pimg':String,
    'restaurantId': String,
});
let cm=mongoose.model('cm',csch)
module.exports=cm