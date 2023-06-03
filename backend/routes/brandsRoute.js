const express = require('express');
const router = express.Router();

// controllers
const {
    createNewBrand,
    getBrandById,
    getAllBrands,
} = require('../controllers/brandsController');

// middlewares
const { isAuthenticated } = require('../middlewares/auth');
const { upload } = require("../utils/multer");

router.post("/createBrand", upload.single("file"), createNewBrand);
router.get("/getBrand/:id", getBrandById);
router.get("/getAllBrands", getAllBrands);

module.exports = router;