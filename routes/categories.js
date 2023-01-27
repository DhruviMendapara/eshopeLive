const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/:id",async(req,res)=>{
  const catagory=await Category.findById(req.params.id);

  if(!catagory){
    res.status(500).json({message:"category ID was not found."})
  }
  res.status(200).send(catagory);
})

router.put("/:id",async(req,res)=>{
    const catagory=await Category.findByIdAndUpdate(
      req.params.id,{
        name:req.body.name,
        icon:req.body.icon || category.icon,
        color:req.body.color,
      },
      {new:true}
    );
    if(!catagory){
      return res.status(400).send("category cannot created.")
    }
res.send(catagory);
})


// router.delete("/:id",(req,res)=>{
//   Category.findByIdAndRemove(req.params.id)
//   .then((category)=>{
//     if(category){
//       return res.status(200).json({success:true,message:"the category is deleted"});
//     } 
//     else{
//       return res.status(404).json({success:false,message:"cateegory not found"});
//     }
//   })
//   .catch((err)=>{
//     return res.status(500).json({success:false,console,error:err
//     })
//   })
// })

router.delete("/:id",async(req,res)=>{
  const category=await Category.findByIdAndRemove(req.params.id);
  if(category){
    return res.status(400).send("Category delete");
  }
  // else
  // {
  //   return res.status(200).send("Category not find");
  // }
})

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  const category_insert = await category.save();

  if (!category_insert) return res.status(400).send("the category cannot be created!");

  res.send(category_insert);
});

module.exports = router;
