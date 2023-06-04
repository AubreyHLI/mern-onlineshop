const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
const User = require("../models/userModel");
// const Order = require("../model/order");
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');

// create new product 
const createNewProduct = asyncHandler( async(request, response, next) => { 
    try {
        const brandId = request.body.brandId;
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return next(new CustomErrorClass(400, "Brand Id is invalid!"));
        } else {
            const files = request.files;
            const imageUrls = files.map((file) => `${file.filename}`);

            const productData = request.body;
            productData.images = imageUrls;
            productData.brand = brand;

            const product = await Product.create(productData);
            const products = await Product.find().sort({ createdAt: -1 });

            response.status(201).json({
                success: true,
                products,
            });
        }
    } catch (error) {
        return next(new CustomErrorClass(400, error));
    }
})


// get all products
const getAllProducts = asyncHandler( async(request, response, next) => { 
    const products = await Product.find().sort({ createdAt: -1 });
    response.status(201).json({
        success: true,
        products,
    });
})


// review for a product
const createReview = asyncHandler( async(request, response, next) => { 
    const { user, rating, comment, productId, orderId } = request.body;
    const product = await Product.findById(productId);
    const review = {
        user,
        rating,
        comment,
        productId,
    };
    const isReviewed = product.reviews.find((rev) => rev.user._id === request.user._id);

    // update review if the user has already commented, else create new one
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user._id === request.user._id) {
                (rev.rating = rating), (rev.comment = comment), (rev.user = user);
            }
        });
    } else {
        product.reviews.push(review);
    }

    // calculate the average rating
    let avgRating = 0;
    product.reviews.forEach((rev) => { avgRating += rev.rating });
    product.ratings = avgRating / product.reviews.length;

    // save the review
    await product.save({ validateBeforeSave: false });
    // await Order.findByIdAndUpdate(
    //     orderId,
    //     { $set: { "cart.$[elem].isReviewed": true } },
    //     { arrayFilters: [{ "elem._id": productId }], new: true }
    // );

    response.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
    });
})



// shopping cart
const addProductToCart = asyncHandler(async (req, res, next) => {
    const { product, qty, repeat } = req.body;
    const user = await User.findById(req.user.id);
    const existsProduct = user.shoppingCart.find(item => item.productId === req.params.id);
    if (existsProduct) {
        if(repeat) {
            existsProduct.qty += qty;
        } else {
            return next(new CustomErrorClass(400, "Product is already in shopping cart!"));
        }
    } else { // add the new product to the shopping cart array
        user.shoppingCart.push({
            product: {...product},
            productId: product._id,
            qty,
        });
    }
    await user.save();

    // const cartItems = await user.shoppingCart.sort({createdAt: -1});
    res.status(201).json({
        success: true,
        cartItems: user.shoppingCart,
        message:'Item added to cart successfully!'
    });
})


const getAllCartItems = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    // const cartItems = await user.shoppingCart.sort((a,b) => b.createdAt - a.createdAt);

    res.status(200).json({
        success: true,
        cartItems: user.shoppingCart,
    });
})


const deleteProductInCart = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const itemId = req.params.id;
    const user = await User.findOneAndUpdate({_id: userId}, {$pull: {shoppingCart: { _id: itemId }}}, {new:true});

    res.status(201).json({
        success: true,
        cartItems: user.shoppingCart,
    });
})


const updateProductInCart = asyncHandler(async (req, res, next) => {
    const {itemId, qty} = req.body;
    const userId = req.user.id;
    const user = await User.findOneAndUpdate({"_id": userId, "shoppingCart._id": itemId}, {$set: {"shoppingCart.$.qty": qty}}, {new:true});

    res.status(201).json({
        success: true,
        cartItems: user.shoppingCart,
    });
})


// wishilist
const addProductToWishlist = asyncHandler(async (req, res, next) => {
    const {productId, product} = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    const existsProd = user.wishlist.find(item => item.product._id.toString() === productId);
    if (existsProd) {
        const user1 = await User.findOneAndUpdate({_id: userId}, {$pull: {wishlist: { productId: productId }}}, {new:true});
        res.status(201).json({
            success: true,
            wishItems: user1.wishlist, 
        });
    } else { // add the new product to the wishlist array
        const user2 = await User.findOneAndUpdate(
            {_id: userId}, 
            {$push: 
                { wishlist: { 
                    product, 
                    productId,
                }}
            }, {new:true});
        res.status(201).json({
            success: true,
            wishItems: user2.wishlist, 
        });
    }
})


const getAllWishItems = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        wishItems: user.wishlist,
    });
})


const deleteProductInWishlist = asyncHandler(async (req, res, next) => {
    try{
        const wishItemId = req.params.id;
        const userId = req.user.id;
        const user = await User.findOneAndUpdate({_id: userId}, {$pull: {wishlist: { _id: wishItemId }}}, {new:true});
    
        res.status(201).json({
            success: true,
            wishItems: user.wishlist, 
        });
    } catch(err) {
        return next(new CustomErrorClass(500, err.message));
    }
})





// export
module.exports = {
    createNewProduct,
    getAllProducts,
    createReview,

    addProductToCart,
    updateProductInCart,
    getAllCartItems,
    deleteProductInCart,

    addProductToWishlist,
    getAllWishItems,
    deleteProductInWishlist,
}