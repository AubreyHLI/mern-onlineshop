// use the model
const User = require('../models/userModel');
const CustomErrorClass = require('../utils/CustomErrorClass');
const jwt = require('jsonwebtoken');
const sendActivationMail = require('../utils/sendActivationMail');
const asyncHandler = require('../middlewares/asyncHandler');
const saveTokenToCookie = require('../utils/saveTokenToCookie');

// Create a new User
const createUser = asyncHandler( async(request, response, next) => {
    const { name, email, password } = request.body;
    const existUser = await User.findOne({ email });

    if (existUser) { 
        return next(new CustomErrorClass(400, `innerrCatch 400 error: User already exists`)); 
    }
    // else
    const userInfo = { name, email, password };
    const jwtToken = createJwtToken(userInfo);
    const activationUrl = `${process.env.CLIENT_URL}/account-activation/${jwtToken}`;
    try {
        await sendActivationMail({
            receiver: userInfo.email,
            subject: 'Activate your Mern Supermarket Account',
            text: `Hello ${userInfo.name}, Thank you for signing up for Mern Supermarket! Please click on the link below to activate your account:${activationUrl}`,
            html: `Hello ${userInfo.name},<br/><br/>Thank you for signing up for Mern Supermarket. Please click on the link below to activate your account: <br/>${activationUrl} <br/><br/>
                This link will expire in 10 minutes. If you did not sign up for the Mern Supermarket account, you can safely ignore this email.<br/><br/>Best,<br/><br/>The Mern Supermarket Team`,
        });
        response.status(201).json({
            success: true, 
            message: `Please check your email ${userInfo.email} to activate your account!`,
        });
    } catch(error) {
        return next(new CustomErrorClass(500,`outerCatch 500 error: ${error.message}`));
    }    
});


// create jwt token
const createJwtToken = (userPayload) => {
    return jwt.sign(userPayload, process.env.JWT_URL_SECRET_KEY, { expiresIn: process.env.JWT_URL_EXPIRESIN });
};


// Validate jwt token
const validateToken = asyncHandler( async (request, response, next) => {
    const { activation_token } = request.body;
    const userPayload = jwt.verify(activation_token, process.env.JWT_URL_SECRET_KEY);
    if(!userPayload) {
        return next(new CustomErrorClass(400, "Invalid activation token"));
    }
    // else
    const { name, email, password } = userPayload;
    const existUser = await User.findOne({ email });
    if (existUser) {
        return next(new CustomErrorClass(400, "User already exists"));
    }
    // else
    const newUser = await User.create({ name, email, password});
    saveTokenToCookie(newUser, 201, response);
});


// Login user
const loginUser = asyncHandler( async (request, response, next) => {
    const { email, password } = request.body;
    const existUser = await User.findOne({ email }).select('+password'); // Use `+` to override schema-level `select: false` so include password field in the returned query result
    if(!existUser) {
        return next(new CustomErrorClass(400, "User doesn't exist!"));
    }
    // else
    const checkPW = await existUser.comparePassword(password);
    if(!checkPW) {
        return next(new CustomErrorClass(400, "Password is wrong, please enter the correct password."));
    }
    // else 
    saveTokenToCookie(existUser, 201, response);
});
    

// Load user stored in cookie
const getUserInCookie = asyncHandler( async(request, response, next) => {
    try{
        console.log('request.user:', request.user.id);
        const cookieUser = await User.findById(request.user.id);
        if(!cookieUser) {
            return next(new CustomErrorClass(400, "User doesn't exist!"));
        }
        // else
        response.status(200).json({
            success: true,
            user: cookieUser
        })
    } catch (err) {
        return next(new CustomErrorClass(500, err.message));
    }
});


// Profile actions
const logoutUser = asyncHandler( async(request, response, next) => {
    try {
        response.clearCookie("userToken");
        response.status(201).json({
            success: true,
            message: "Log out successful!",
        });
    } catch (err) {
        return next(new CustomErrorClass(500, err.message));
    }
})


const updateUserInfo = asyncHandler( async(req, res, next) => {
    const { name, phoneNumber, email } = req.body;
    const user = await User.findOne({_id: req.user.id});
    if (!user) {
        return next(new CustomErrorClass(400, "User not found"));
    }
    const emailUsed = await User.findOne({email});
    if(emailUsed && emailUsed._id.toString() !== user._id.toString()) {
        return next(new CustomErrorClass(400, "Email was used, please change one."));
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await user.save();

    res.status(201).json({
        success: true,
        user,
    });
})
  
  
// update user addresses
const updateUserAddresses = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const existsAddress = user.addresses.find((address) => address._id === req.body._id);
    if (existsAddress) {
        Object.assign(existsAddress, req.body);
    } else {
        // add the new address to the array
        user.addresses.push(req.body);
    }
    await user.save();

    res.status(201).json({
        success: true,
        user,
    });
})
  
// delete user address
const deleteAddress = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const addressId = req.params.id;
    const user = await User.findOneAndUpdate({ _id: userId, }, { $pull: { addresses: { _id: addressId }}}, {new:true});

    res.status(200).json({ 
        success: true, 
        message: 'Address was deleted',
        user });
})
  
// update user password
const updateUserPw = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new CustomErrorClass(400, "Old password is incorrect!"));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new CustomErrorClass(400, "Confirmed Password doesn't matched!"));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully!",
    });
})


// Admin
const loginAdmin = asyncHandler( async (request, response, next) => {
    const { email, password } = request.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PW) {
        response.status(201).json({
            success: true,
            isAdmin: true
        })
    } else if (email === process.env.ADMIN_EMAIL && password !== process.env.ADMIN_PW) {
        return next(new CustomErrorClass(400, "Password is wrong, please enter the correct password."));
    } else {
        return next(new CustomErrorClass(400, "Account doesn't exist!"));
    }
});


const getAllUsers =  asyncHandler( async (req, res, next) => {
    const users = await User.find().sort({
        createdAt: -1,
    });
    res.status(200).json({
        success: true,
        users,
    });
})
  

const deleteUserById = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new CustomErrorClass(400, "User is not available with this id"));
    }

    const users = await User.find().sort({
        createdAt: -1,
    });

    res.status(201).json({
        success: true,
        message: "User deleted successfully!",
        users,
    });
})



// export
module.exports = {
    createUser,
    validateToken,
    loginUser,
    getUserInCookie,

    logoutUser,
    updateUserInfo,
    updateUserAddresses,
    deleteAddress,
    updateUserPw,

    loginAdmin,
    getAllUsers,
    deleteUserById,
}