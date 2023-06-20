const express = require('express');
const router = express.Router();

// controllers
const {
    createNewOrder,
    getUserAllOrders,
    requestOrderRefund,
    getAllOrders,
    updateOrderStatus,
    acceptOrderRefund,
} = require('../controllers/ordersController');

// middlewares
const { isAuthenticated } = require('../middlewares/auth');

router.post("/createOrder", isAuthenticated, createNewOrder);
router.get("/getUserAllOrders", isAuthenticated, getUserAllOrders);
router.patch("/requestOrderRefund/:orderId", isAuthenticated, requestOrderRefund);

router.get("/adminAllOrders", getAllOrders);
router.patch("/updateOrderStatus/:orderId", updateOrderStatus);
router.patch("/acceptOrderRefund/:orderId", acceptOrderRefund);

module.exports = router;