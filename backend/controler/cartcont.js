let { v4 } = require("uuid");
const cm = require("../model/cartmodel");
const pm = require("../model/prodmodel");


let addcart = async (req, res) => {
  try {
    let { uid, pid } = req.body; // ✅ Extract restaurantId
    let product = await pm.findById(pid);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    let restaurantId = product.restaurantId;
    let result = await cm.find({ uid, pid });
    if (result.length > 0) {
      await cm.findByIdAndUpdate(result[0]._id, { $inc: { qty: 1 } });
      res.json({ msg: "qty inc" });
    } else {
      let data = new cm({ ...req.body, _id: v4(), restaurantId, }); // ✅ Ensure restaurantId is stored
      await data.save();
      res.json({ msg: "prod added to cart" });
    }
  } catch (err) {
    console.error("❌ Error in adding to cart:", err);
    res.status(500).json({ msg: "error in adding" });
  }
};

let getcart = async (req, res) => {
  try {
    let data = await cm.find({ uid: req.params.uid });
    res.json(data);
  } catch (err) {
    res.json({ msg: "error in fetching cart" });
  }
};
let inc = async (req, res) => {
  try {
    await cm.findByIdAndUpdate({ _id: req.params.cid }, { $inc: { qty: 1 } });
    res.json({ msg: "cart inc" });
  } catch (err) {
    res.json({ msg: "error in cart inc" });
  }
};
let dec = async (req, res) => {
  try {
    await cm.findByIdAndUpdate({ _id: req.params.cid }, { $inc: { qty: -1 } });
    res.json({ msg: "cart inc" });
  } catch (err) {
    res.json({ msg: "error in cart inc" });
  }
};
let delcart = async (req, res) => {
  try {
    await cm.findByIdAndDelete({ _id: req.params.cid });
    res.json({ msg: "prod del from cart" });
  } catch (err) {
    res.json({ msg: "error in del cart" });
  }
};


module.exports = { addcart, getcart, inc, dec, delcart };