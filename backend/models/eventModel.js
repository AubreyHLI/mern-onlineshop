const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    productId:{
        type: String,
        required: true,
    },
    product: {
        type: Object,
        required: true,
    },
    description:{
        type: String,
        required:[true,"Please enter your event description!"],
    },
    discountPrice:{
        type: Number,
        required: [true,"Please enter your event product price!"],
    },
    start_Date: {
        type: Date,
        required: true,
    },
    finish_Date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: "Running",
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Event", eventSchema);