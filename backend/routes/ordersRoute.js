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
router.post("/createOrder", createNewOrder);
router.get("/getUserOrders/:userId", getUserAllOrders);
router.put("/requestOrderRefund/:orderId", requestOrderRefund);

router.get("/adminAllOrders", getAllOrders);
router.put("/updateOrderStatus/:orderId", updateOrderStatus);
router.put("/acceptOrderRefund/:orderId", acceptOrderRefund);

module.exports = router;