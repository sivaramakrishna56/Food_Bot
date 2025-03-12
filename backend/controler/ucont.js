let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const um = require("../model/usermodel")
let reg = async(req,res)=>{
    try{
        let obj = await um.findById({"_id":req.body._id})
        if(obj){
            res.json({"msg":"account exist"})
        }
        else{
            let hashcode = await bcrypt.hash(req.body.pwd,10)
            let data = new um({...req.body,"pwd":hashcode})
            await data.save()
            res.json({"msg":"account created"})
        }
    }
    catch(err){
        res.json({"msg":"error in register"})
    }
}

let login = async(req,res)=>{
    try{
        let obj = await um.findById({"_id":req.body._id})
        if(obj){
            let f = await bcrypt.compare(req.body.pwd,obj.pwd)
            if(f){
                res.json({"token":jwt.sign({"_id":req.body._id},"ecom"),"_id":obj._id,"name":obj.name,"role":obj.role})
            }
            else{
                res.json({"msg":"check password"})
            }
        }
        else{
            res.json({"msg":"check email"})
        }
    }
    catch(err){
        res.json({"err":"error in login"})
    }
}
module.exports = {reg,login}