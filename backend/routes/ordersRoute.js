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
router.put("/requestOrderRefund/:orderId", isAuthenticated, requestOrderRefund);

router.get("/adminAllOrders", getAllOrders);
router.put("/updateOrderStatus/:orderId", updateOrderStatus);
router.put("/acceptOrderRefund/:orderId", acceptOrderRefund);

module.exports = router;