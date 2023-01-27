const mongoose=require("mongoose");
const orderitemSchema= new mongoose.Schema({
    quntity:{type:Number,require:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
});

// orderitemSchema.virtual("id").get(function () {
//     return this._id.toHexString();
//   });
  
//   orderitemSchema.set("toJSON", {
//     virtuals: true,
//   });

exports.orderitems=mongoose.model("orderitems",orderitemSchema);