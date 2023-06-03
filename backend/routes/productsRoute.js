const express = require('express');
const router = express.Router();

// controllers
const {
    createNewProduct,
    getProductsByBrand,
    getAllProducts,
    createReview,
} = require('../controllers/productsController');

// middlewares
const { isAuthenticated } = require('../middlewares/auth');
const { upload } = require("../utils/multer");

router.post("/createProduct", upload.array("images"), createNewProduct);
router.get("/getAllProducts", getAllProducts);
router.put("/createNewReview", isAuthenticated, createReview);


module.exports = router;