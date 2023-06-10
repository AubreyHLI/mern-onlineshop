const express = require('express');
const router = express.Router();

// controllers
const {
    createNewCoupon,
    getAllCoupons,
    deleteCoupon,
    getCouponByCode,
} = require('../controllers/couponsController');

// middlewares
router.post("/createCoupon", createNewCoupon);
router.get("/getAllCoupons", getAllCoupons);
router.delete("/deleteCoupon/:id", deleteCoupon);
router.get("/getCouponByCode/:code", getCouponByCode);

module.exports = router;