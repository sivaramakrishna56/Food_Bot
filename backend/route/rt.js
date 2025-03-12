let express = require("express")
const { login, reg } = require("../controler/ucont")
const { getrest } = require("../controler/rcont")
const { getprod, addcom } = require("../controler/prodcont")
const { addcart, getcart, inc, dec, delcart } = require("../controler/cartcont")
const { placeOrder, createPaymentIntent, userorders } = require("../controler/paymentController")
let rt = new express.Router()
rt.post("/reg",reg)
rt.post("/login",login)
rt.get("/getrest",getrest)
rt.get("/getprod",getprod)
rt.post('/addcart',addcart)
rt.get("/gettcart/:uid",getcart)
rt.get("/inc/:cid",inc)
rt.get("/dec/:cid",dec)
rt.delete("/del/:cid",delcart)
rt.put("/addcom",addcom)
rt.post("/payments/create-payment-intent", createPaymentIntent);
rt.post("/orders/place-order", placeOrder);
rt.get("/uorder/:userId", userorders);
module.exports=rt