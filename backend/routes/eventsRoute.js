const express = require('express');
const router = express.Router();

// controllers
const {
    createNewEvent,
    getAllEvents,
    getEventsByBrand,
    deleteEventById,
    deleteEventsByProduct,
} = require('../controllers/eventsController');

const { upload } = require("../utils/multer");

router.post("/createEvent", upload.single("file"), createNewEvent);
router.get("/getAllEvents", getAllEvents);
router.get("/getBrandEvents/:id", getEventsByBrand);
router.delete("/deleteEvent/:id", deleteEventById);
router.delete("/deleteProductEvents/:id", deleteEventsByProduct);

module.exports = router;