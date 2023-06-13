const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');

// create new order
const createNewOrder = asyncHandler(async (req, res, next) => {
	const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
	const order = await Order.create({
		cart,
		shippingAddress,
		user,
		totalPrice,
		paymentInfo,
	});
	const orders = await Order.find().sort({ createdAt: -1 });
	res.status(201).json({
		success: true,
		message: "Order created successfully!",
		orders,
	});
})


// get all orders of user
const getUserAllOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find({ "user._id": req.user.id }).sort({
		createdAt: -1,
	});
	res.status(200).json({
		success: true,
		orders,
	});
})


// request a refund
const requestOrderRefund= asyncHandler(async (req, res, next) => {
	const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}

	existsOrder.status = req.body.status;
	await existsOrder.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		order: existsOrder,
		message: "Order Refund Request successfully!",
	});
})


// all all orders --- admin
const getAllOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find().sort({
		deliveredAt: -1,
		createdAt: -1,
	});
	res.status(201).json({
		success: true,
		orders,
	});
})


// update order status ---- admin
const updateOrderStatus = asyncHandler(async (req, res, next) => {
	const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}

	if (req.body.status === "Transferred to delivery partner") {
		existsOrder.cart.forEach(async (item) => {
			const product = await Product.findById(item.productId);
			product.stock -= item.qty;
			product.sold_out += item.qty;
			await product.save({ validateBeforeSave: false });
		});
	}

	if (req.body.status === "Delivered") {
		existsOrder.deliveredAt = Date.now();
		existsOrder.paymentInfo.status = "Succeeded";
	}
	
	existsOrder.status = req.body.status;
	await existsOrder.save({ validateBeforeSave: false });

	res.status(200).json({
		success: true,
		order: existsOrder,
	});
})


// accept the refund ---- admin
const acceptOrderRefund = asyncHandler(async (req, res, next) => {
	const existsOrder = await Order.findById(req.params.id);
	if (!existsOrder) {
		return next(new CustomErrorClass(400, "Order not found with this id"));
	}

	if (req.body.status === "Refund Success") {
		existsOrder.cart.forEach(async (item) => {
			// await updateOrder(item._id, item.qty);
			const product = await Product.findById(item.productId);
			console.log('product:', product);
			product.stock += qty;
			product.sold_out -= qty;
			await product.save({ validateBeforeSave: false });
		});
	}

	existsOrder.status = req.body.status;
	await existsOrder.save();

	res.status(200).json({
		success: true,
		message: "Order Refund successfull!",
	});
})


module.exports = {
  	createNewOrder,
  	getUserAllOrders,
	requestOrderRefund,

	getAllOrders,
	updateOrderStatus,
	acceptOrderRefund,
};