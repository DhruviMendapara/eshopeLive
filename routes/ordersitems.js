const { orderitems } =require("../models/orderitem");
const express=require("express");
const { Product }=require("../models/product");
const router=express.Router();


router.get(`/`, async (req, res) =>{
    const orderitemsList = await orderitems.find()
        // .populate("user","name")
        // .sort({dateOrdered:-1})
    if(!orderitemsList) {
        res.status(500).json({success: false})
    } 
    res.send(orderitemsList);
})



router.post("/",async(req,res)=>{
    
  let orderitem=new orderitems({
        product:req.body.product,
        quntity:req.body.quntity,
    });
   const orderitem_insert=await orderitem.save();

    if(!orderitem_insert) {
        return res.status(400).send("order item not create");
    }

        res.send(orderitem_insert);
    
})
module.exports=router;


//      let product=await Product.findById(req.body.product);
//   if(!product) return res.status(400).send("Invalid Product");