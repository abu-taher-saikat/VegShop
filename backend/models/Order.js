const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const User = require('./User');

const orderSchema = mongoose.Schema({
  user : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User"
  },
  oderItems: [{
      title : { type : String, required : true},
      qty : { type : Number, required : true},
      image : { type : String, required : true},
      price : { type : String, required : true},
      product : { 
          type : mongoose.Schema.Types.ObjectId,
          required : true,
          ref : "Product"
      }
  }],
  shippingAddress {
      type : 
  }
  totalPrice : { 
      type : Number,
      required: true,
      default : 0
  },
  isPaid : {
      type : Boolean,
      required : true,
      default : false
  },
  paidAt : {
      type : Date
  },
  isDelivered : {
      type : Boolean,
      required : true,
      default : false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Order", orderSchema);
