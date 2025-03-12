let multer=require("multer")
let {v4}=require("uuid")
const pm = require("../model/prodmodel")
const cm = require("../model/cartmodel")
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './prodimgs')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })
  
const upload = multer({ storage: storage })

let addprod=async(req,res)=>{
    try{
        let data=new pm({...req.body,"_id":v4(),"name":req.body.name,"cat":req.body.cat,"price":req.body.price,"disc":req.body.desc,"rating":req.body.rating,"pimg":req.file.filename,"restaurantId":req.body.restaurantId})
        await data.save()
        res.json({"msg":"prod was added"})
    }
    catch(err)
    {
        res.json({"msg":"error in adding prod"})
    }
}
let getprod=async(req,res)=>{
  try{
    let data=await pm.find()
    res.json(data)
  }
  catch(err){
    res.json({"msg":"erro in fetching prod data"})
  }
}
let addcom = async (req, res) => {
  try {
    let obj = { ...req.body };
    delete obj["_id"];
    await pm.findByIdAndUpdate({ _id: req.body._id }, { $push: { comm: obj } });
    let data = await pm.findById({ _id: req.body._id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ msg: "error in adding comm" });
  }
};
let edit = async (req, res) => {
  try {
    await pm.findByIdAndUpdate({ _id: req.body._id }, req.body);
    let data = { ...req.body };
    delete data["_id"];
    delete data["desc"];
    await cm.updateMany({ pid: req.body._id }, data);
    res.json({ msg: "upd done" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error in edit prod" });
  }
};
let editimg = async (req, res) => {
  try {
    await pm.findByIdAndUpdate(
      { _id: req.body._id },
      { pimg: req.file.filename }
    );
    fs.rm(`./prodimgs/${req.body.oldimg}`, () => {});
    await cm.updateMany({ pid: req.body._id }, { pimg: req.file.filename });
    res.json({ msg: "upd done" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error in edit prod" });
  }
};
let delprod=async(req,res)=>{
  try{
    let obj=await pm.findByIdAndDelete({"_id":req.params.pid})
    console.log(obj)
    fs.rm(`./prodimgs/${obj.pimg}`, () => {});
   await cm.deleteMany({"pid":req.params.pid})
    res.json({"msg":"deldone"})

  }
  catch(err)
  {
    res.json({"msg":"error in del"})
  }
}

module.exports={addprod,getprod,upload,addcom,edit,editimg,delprod}