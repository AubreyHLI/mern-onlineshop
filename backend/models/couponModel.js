const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code:{
        type: String,
        required:[true,"Please enter your coupon code!"],
        unique: true,
    },
    value:{
        type: Number,
        required: true,
    },
    minAmount:{
        type: Number,
    },
    maxAmount:{
        type: Number,
    },
    selectedBrandId:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Coupon", couponSchema);