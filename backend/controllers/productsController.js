const Product = require("../models/productModel");
const Brand = require("../models/brandModel");
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

            response.status(201).json({
                success: true,
                product,
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


// export
module.exports = {
    createNewProduct,
    getAllProducts,
    createReview,
}