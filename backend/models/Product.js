const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const User = require('./User');

const productSchema = mongoose.Schema({
  user : {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : "User"
  },
  title: {
    type: String,
    required: [true, "Please add a name"],
  },
  image : {
      type : String,
      required: [true, "Please add a image"],
      default : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fmockup&psig=AOvVaw0J6dD1EfHBZ7IU7OgUabIA&ust=1618983613676000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNj63o6OjPACFQAAAAAdAAAAABAD'
  },
  category : {
    type: String,
    required: [true, "Please add a name"],
  },
  description : {
    type: String,
    required: [true, "Please add a description"],
  },
  price : {
    type: Number,
    required: [true, "Please add a price"],
    default : 0
  },
  discount : {
      type : Number,
      required: true,
      default : 0
  },
  countInStock : {
    type: Number,
    required: [true, "Please add a Stock value"],
    default : 0
  },
  rating : {
    type: Number,
    required: [true, "Please add a rating"],
    default : 0
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Product", productSchema);
