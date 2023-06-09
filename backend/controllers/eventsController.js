const Event = require("../models/eventModel");
const Brand = require("../models/brandModel");
const Product = require("../models/productModel");
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');

// create event
const createNewEvent = asyncHandler( async (req, res, next) => {
	try {
		const productId = req.body.productId;
		const product = await Product.findById(productId);
		console.log('productId:',productId);
		if (!product) {
			return next(new CustomErrorClass(400, "Product Id is invalid!"));
		} else {
			const eventData = req.body;
			eventData.product = product;
			const event = await Event.create(eventData);
			const events = await Event.find().sort({
				createdAt: -1,
			});
			res.status(201).json({
				success: true,
				events,
			});
		}
	} catch (error) {
		return next(new CustomErrorClass(400, error));
	}}
)


// get all events
const getAllEvents = asyncHandler(async (req, res, next) => {
	try {
		const events = await Event.find().sort({
			createdAt: -1,
		});
		res.status(201).json({
			success: true,
			events,
		});
	} catch (error) {
		return next(new CustomErrorClass(400, error));
	}
});


// get all events of a brand
const getEventsByBrand = asyncHandler(async (req, res, next) => {
	try {
		const events = await Event.find({ brandId: req.params.id });
		res.status(201).json({
			success: true,
			events,
		});
	} catch (error) {
		return next(new CustomErrorClass(400, error));
	}
})


// delete event by Id
const deleteEventById = asyncHandler(async (req, res, next) => {
	try {
		const eventId = req.params.id;
		const event = await Event.findByIdAndDelete(eventId);
		if (!event) {
			return next(new CustomErrorClass(500, "Event not found with this id!"));
		}
		res.status(201).json({
			success: true,
			message: "Event Deleted successfully!",
		});
	} catch (error) {
		return next(new CustomErrorClass(400, error));
	}
})

// delete events by product
const deleteEventsByProduct = asyncHandler(async (req, res, next) => {
	try {
		const productId = req.params.id;
		const events = await Event.deleteMany({event_productId: {$eq: productId}});
		if (!events) {
			return next(new CustomErrorClass(500, "Events not found with this product!"));
		}
		res.status(201).json({
			success: true,
			message: "Events Deleted successfully!",
		});
	} catch (error) {
		return next(new CustomErrorClass(400, error));
	}
})


module.exports = {
  	createNewEvent,
    getAllEvents,
    getEventsByBrand,
    deleteEventById,
	deleteEventsByProduct,
};