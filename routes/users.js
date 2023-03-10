const { User } = require("../models/user");
const express = require("express");

const bcrypt = require("bcryptjs");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const userList = await User.find();
 
  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.passwordHash, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.get("/:id",async(req,res)=>{
  const user=await User.findById(req.params.id);
  if(!user){
    res.status(500).json({message:"Id not found"})
  }
  else{
    res.send(user)
  }
})

router.put("/:id",async(req,res)=>{
  const user = await User.findByIdAndUpdate(
    req.params.id,{
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
    },
    {new:true}
  );
  if(!user){
   return res.status(400).json({message:"Update success"});
  }
     res.send(user);
  
})

router.delete("/:id",async(req,res)=>{
  const user=await User.findByIdAndRemove(req.params.id);
  if(user){
   return res.status(400).send("Delete")
  }
})


const jwt=require("jsonwebtoken");
router.post("/login",async(req,res)=>{
  const user=await User.findOne({email:req.body.email});
  const secret=process.env.secret;
  if(!user){
    return res.status(400).send("users not found");
  }
  if(user && bcrypt.compareSync(req.body.password,user.password))
  {
    const token=jwt.sign({
      usetId:user.id,
      isAdmin:user.isAdmin,
    },
      secret,
      { expiresIn:"1d"}
    );
    res.status(200).send({user:user.email,token:token});
  }
  else{
      res.status(400).send("password is wrong")
  }
});

module.exports = router;
