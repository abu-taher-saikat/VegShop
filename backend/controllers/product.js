const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/Product");
const User = require("../models/User");


//@desc Create Product
//@route POST /api/v1/product
//@access private/admin
exports.createProduct = asyncHandler(async (req, res, next) => {

 //  user.id = req.user._id;

  req.body.user = req.user
  const { title, price, description,category, discount, rating, countInStock, image} = req.body;

  // create a product
  const product = await Product.create(req.body)

  if (product) {
    res.status(201).json({
      success : true,
      product,
    });
  } else {
    res.status(400);
    throw new Error("Please input the values");
  }
});



//@desc Get product by ID
//@route GET /api/v1/product/:id
//@access private/admin
exports.getProductById = asyncHandler(async (req, res, next) => {

    const productId = req.params.id ;
    const product = await Product.find({_id : productId}).populate({
        path : 'User',
        select : 'name email'
    });
   
     if (product) {
       res.status(201).json({
         success : true,
         product,
       });
     } else {
       res.status(400);
       throw new Error("Wrong Product id");
     }
   });


   

//@desc Fetch all products
//@route GET /api/v1/products
//@access public
exports.getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find();
   
     if (products) {
       res.status(201).json({
         success : true,
         count : products.length,
         products,

       });
     } else {
       res.status(400);
       throw new Error("Product not found");
     }
   });



//@desc update a product by id
//@route PUT /api/v1/products/:id
//@access public
exports.updateProduct = asyncHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id , req.body,{
        new : true,
        runValidators : true
    })

    res.status(203).json({
        success : true,
        product
    })
   
});




//@desc delete a product
//@route DELETE /api/v1/products/:id
//@access public
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    product.remove();
    
    res.status(203).json({
        success : true,
        product : {}
    })
   
});
