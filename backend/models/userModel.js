const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');    // npm 的bcryct package
const jwt = require("jsonwebtoken");


const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be greater than 6 characters"],
        select: false,// not return password field info when query(select) this user
    },
    address: {
        type: String,
    },
    shoppingCart: [
        {
            product: { type: Object, },
            productId: { type: String },
            qty: { type: Number, },
            createdAt:{ type: Date,  default: Date.now(), }
        },
    ],
    wishlist: [
        {
            product: { type: Object, },
            productId: { type: String, },
            createdAt:{ type: Date,  default: Date.now(), }
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});


// generate a jwt token for a specific user
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_COOKIE_SECRET_KEY, {
        expiresIn: process.env.JWT_COOKIE_EXPIRESIN,
    });
};


// check password when login account
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Hash password before sava to db
UserSchema.pre("save", function (next) {
    const user = this;
    if (!this.isModified("password")) {
       return next();
    } 
    // else 
    bcrypt.genSalt(10, function (err, salt) { 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
                return next(err);
            }
            // store hash password to db
            user.password = hash; 
            next();
        });
    })
});


module.exports = mongoose.model("User", UserSchema);