const Coupon = require("../models/couponModel");
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');

// create coupon code
const createNewCoupon = asyncHandler(async (req, res, next) => {
    const isCouponCodeExists = await Coupon.findOne({code: req.body.code});
    console.log('isCouponCodeExists:', isCouponCodeExists);
    if (isCouponCodeExists) {
        return next(new CustomErrorClass(400, "Coupon code already exists!"));
    }
    const coupon = await Coupon.create(req.body);
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(201).json({
        success: true,
        message: "Coupon created successfully!",
        coupons,
    });
})

// get all coupons 
const getAllCoupons = asyncHandler(async (req, res, next) => {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    console.log('coupons:', coupons);
    res.status(201).json({
        success: true,
        coupons,
    });
})

// get coupon value by its code
const getCouponByCode = asyncHandler(async (req, res, next) => {
    const coupon = await Coupon.findOne({ code: req.params.code });
    if(!coupon) {
        return next(new CustomErrorClass(400, `Coupon code ${req.params.code} is invalid!`));
    }
    res.status(200).json({
        success: true,
        coupon,
    });
})

// delete coupon code
const deleteCoupon =  asyncHandler(async (req, res, next) => {
//     try {
//         const couponCode = await couponCode.findByIdAndDelete(req.params.id);

//         if (!couponCode) {
//             return next(new ErrorHandler("Coupon code dosen't exists!", 400));
//         }
//         res.status(201).json({
//             success: true,
//             message: "Coupon code deleted successfully!",
//         });
//     } catch (error) {
//         return next(new ErrorHandler(error, 400));
//     }
})




module.exports = {
    createNewCoupon,
    getAllCoupons,
    deleteCoupon,
    getCouponByCode,
};