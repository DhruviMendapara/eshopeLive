const mongoose=require("mongoose");

const OrdersSchema=new mongoose.Schema({
    orderitems:[{type:mongoose.Schema.Types.ObjectId,require:true}],
    shippingAddress1:{type:String,require:true},
    shippingAddress2:{type:String,require:true},
    city:{type:String,require:true},
    zip:{type:String,require:true},
    country:{type:String,require:true},
    phone:{type:Number,require:true},
    status:{type:String,require:true,default:"Pending"},
    totalPrice:{type:Number,require:true}, 
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},  // User is Collection name
    dateOrdered:{type:Date,default:Date.now},
});
OrdersSchema.virtual("id").get(function(){
    return this._id.toHexstring;
});
OrdersSchema.set("toJSON",{
    virtuals:true,
});

exports.Order = mongoose.model('Order', OrdersSchema);

// {
//     "orderitems":[
//         {
//             "quntity":3,
//             "product":"63cb828a1319fd70823c5d5d"
//         },
//         {
//             "quntity":2,
//             "product":"63cb8a1c0bf3210cc4ca5389"
//         }
//     ],
//     "shippingAddress1":"surat",
//     "shippingAddress2":"surat",
//     "city":"surat",
//     "zip":"3901",
//     "country":,
//     "phone":123455677,
//     "user":"63c93b1e627a3c4b4423eb45",
// }