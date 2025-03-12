let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const rm = require("../model/restmodel")
let multer=require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './restimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
const rupload = multer({ storage: storage })

let reg = async(req,res)=>{
    try{
        let obj = await rm.findById({"_id":req.body._id})
        if(obj){
            res.json({"msg":"account exist"})
        }
        else{
            let hashcode = await bcrypt.hash(req.body.pwd,10)
            let data = new rm({...req.body,"pwd":hashcode,"rimg":req.file.filename})
            await data.save()
            res.json({"msg":"account created"})
        }
    }
    catch(err){
        res.json({"msg":"error in account creation"})
    }
}

let getrest=async(req,res)=>{
    try{
        let data=await rm.find()
        res.json(data)
    }
    catch(err){
        res.json({"msg":"error in fetching"})
    }
} 

let login = async(req,res)=>{
    try{
        let obj = await rm.findById({"_id":req.body._id})
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

module.exports = {reg,login,getrest,rupload}