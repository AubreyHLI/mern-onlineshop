const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const path = require("path");

// config
require('dotenv').config();

// middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// an Express built-in middleware to parse form data as strings or arrays
app.use(express.urlencoded({extended: true}));
// an Express built-in middleware to recognize the incoming Request Object as a JSON Object
app.use(express.json());
app.use(cookieParser());

// route for fetch images 
app.use("/", express.static(path.join(__dirname,"./utils/uploads")));

// import route
const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const brandsRoute = require('./routes/brandsRoute');
const eventsRoute = require('./routes/eventsRoute');
const couponsRoute = require('./routes/couponRoute');
const paymentRoute = require('./routes/paymentRoute');
const orderRoute = require('./routes/ordersRoute');

app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/brands', brandsRoute);
app.use('/api/events', eventsRoute);
app.use('/api/coupons', couponsRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/orders', orderRoute);


// error handling
app.use(errorHandler);


module.exports = app;