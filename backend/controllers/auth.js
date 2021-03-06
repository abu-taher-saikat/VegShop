const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User.js");
const generateToken = require("../utils/generateToken.js");

//@desc Register a user
//@route POST /api/v1/auth/register
//@access public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  console.log(req.body);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Please input the values");
  }
});



//@desc Login a user
//@route POST /api/v1/auth/login
//@access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // create user
  const user = await User.findOne({ email }).select("+password");
  console.log(user)

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



// @desc Get User profile
// @route GET /api/v1/auth/profile
// @access Private
exports.profile = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user._id);

  if(user){
      res.json({
          _id : user._id,
          name : user.name,
          email : user.email,
      })
  }else{
      res.status(404)
      throw new Error('User not found')
  }
})