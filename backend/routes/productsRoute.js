const express = require('express');
const router = express.Router();

// controllers
const {
    createNewProduct,
    getAllProducts,
    createReview,
    addProductToCart,
    updateProductInCart,
    getAllCartItems,
    deleteProductInCart,
    addProductToWishlist,
    getAllWishItems,
    deleteProductInWishlist,
} = require('../controllers/productsController');

// middlewares
const { isAuthenticated } = require('../middlewares/auth');
const { upload } = require("../utils/multer");

router.post("/createProduct", upload.array("images"), createNewProduct);
router.get("/getAllProducts", getAllProducts);
router.put("/createNewReview", isAuthenticated, createReview);

router.post('/addToCart/:id', isAuthenticated, addProductToCart);
router.get('/getCartItems', isAuthenticated, getAllCartItems);
router.patch('/updateCartItem', isAuthenticated, updateProductInCart);
router.delete('/deleteCartItem/:id', isAuthenticated, deleteProductInCart);

router.post('/addToWishlist', isAuthenticated, addProductToWishlist);
router.get('/getWishItems', isAuthenticated, getAllWishItems);
router.delete('/deleteWishItem/:id', isAuthenticated, deleteProductInWishlist);

module.exports = router;