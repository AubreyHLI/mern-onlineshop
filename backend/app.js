const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const path = require("path");

// config
require('dotenv').config();

// middleware
// an Express built-in middleware to parse form data as strings or arrays
app.use(express.urlencoded({extended: true}));
// an Express built-in middleware to recognize the incoming Request Object as a JSON Object
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// route for fetch images 
app.use("/", express.static(path.join(__dirname,"./utils/uploads")));

// import route
const userRoute = require('./routes/userRoute');
const productsRoute = require('./routes/productsRoute');
const brandsRoute = require('./routes/brandsRoute');
const eventsRoute = require('./routes/eventsRoute');

app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/brands', brandsRoute);
app.use('/api/events', eventsRoute);


// error handling
app.use(errorHandler);


module.exports = app;