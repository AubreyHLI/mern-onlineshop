const Brand = require("../models/brandModel");
const asyncHandler = require('../middlewares/asyncHandler');
const CustomErrorClass = require('../utils/CustomErrorClass');

const path = require("path");
const fs = require("fs");


// create brand
const createNewBrand = asyncHandler( async (req, res, next) => {
    const { name } = req.body;
    const brandName = await Brand.findOne({ name });
    if (brandName) {
        const filename = req.file.filename;
        const filePath = `utils/uploads/${filename}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
            }
        });
        return next(new CustomErrorClass(400, "Brand already exists"));
    }

    const brandData = req.body;
    if(req.file) {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        brandData.avatar = fileUrl;
    } 
    const newBrand = await Brand.create(brandData);
    const brands = await Brand.find().sort({
        createdAt: -1,
    });
    
    res.status(201).json({
        success: true,
        brands,
    });
})



// get brand info
const getBrandById = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        return next(new CustomErrorClass("Brand doesn't exists", 400));
    }

    res.status(201).json({
        success: true,
        brand: brand
    });
})



// get all Brands
const getAllBrands = asyncHandler(async (req, res, next) => {
    const brands = await Brand.find().sort({
        createdAt: -1,
    });
    res.status(201).json({
        success: true,
        brands: brands
    });
})

// delete brand by id
const deleteBrandById = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
        return next(new CustomErrorClass("Brand doesn't exists", 400));
    }
    
    const brands = await Brand.find().sort({
        createdAt: -1,
    });

    res.status(201).json({
        success: true,
        message: "Brand deleted successfully!",
        brands,
    });
})


// export
module.exports = {
    createNewBrand,
    getBrandById,
    getAllBrands,
    deleteBrandById,
}