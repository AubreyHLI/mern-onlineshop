const express = require('express');
const router = express.Router();

// controllers
const {
    createNewBrand,
    getAllBrands,
    deleteBrandById,
} = require('../controllers/brandsController');

// middlewares
const { isAuthenticated } = require('../middlewares/auth');
const { upload } = require("../utils/multer");

router.post("/createBrand", upload.single("file"), createNewBrand);
router.get("/getAllBrands", getAllBrands);
router.delete("/deleteBrand/:id", deleteBrandById);

module.exports = router;