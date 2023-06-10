 const CustomeErrorClass = require('../utils/CustomErrorClass');
 const asyncHandler = require('./asyncHandler');
 const jwt = require('jsonwebtoken');
 const User = require('../models/userModel');

// check is there any user logged in and store in cookie
const isAuthenticated = asyncHandler( async(request, response, next) => {
    // console.log('request.cookies:',request.cookies);
    const { userToken } = request.cookies;

    if(!userToken){
        return next(new CustomeErrorClass(401, "Please login first.")); //401 Unauthorized
    }
    // else
    const decoded = jwt.verify(userToken, process.env.JWT_COOKIE_SECRET_KEY);
    request.user = await User.findById(decoded.id).select('-shoppingCart');

    next();
});

module.exports = {
    isAuthenticated
}