const { Product } = require("../models/product");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get("/:id",async(req,res)=>{
  const product=await Product.findById(req.params.id);
  if(!product){
    res.status(400).json({message:"Product not found!"})
  }
  else{
    res.status(200).send(product);
  }
})

router.put("/:id",async(req,res)=>{
  const product=await Product.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    description:req.body.description,
    richDescription:req.body.richDescription,
  },{new:true}
  );
  if(!product){
    res.status(400).json({message:"Update Success"});
  }
    else{
      res.send(product);
    }
  })

router.delete("/:id",async(req,res)=>{
  const product=await Product.findByIdAndRemove(req.params.id);
  if(product){
    res.status(400).send("Product delete");
  }
})

router.post("/",async(req,res)=>{
  let category=await Category.findById(req.body.category);
  if(!category) return res.status(400).send("Invalid catagory");

  let product=new Product({
          name:req.body.name,
          description:req.body.description,
          richDescription:req.body.richDescription,
          image:"image",
          images:"images",
          brand:req.body.brand,
          price:req.body.price,
          category:req.body.category,
          countInStock:req.body.countInStock,
          rating:req.body.rating,
          isfeatured:req.body.isfeatured,
  });
  product = await product.save();

  if (!product) return res.status(400).send("the product cannot be created!");

  res.send(product);
});


module.exports = router;

// {
//   "name":"Milk",
//   "description":"Gold",
//   "richDescription":"Amul Gold",
//   "brand":"Amul",
//   "price":32,
//   "category":"63c9291675a39da045548a8c",
//   "countInStock":100,
//   "rating":4,
//   "numReviews":5,
//   "isFeatured":true
// }
