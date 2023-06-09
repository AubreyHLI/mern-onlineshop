const express = require('express');
const router = express.Router();

// controllers
const {
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
} = require('../controllers/userController');

// middlewares
const { isAuthenticated } = require('../middlewares/auth');


router.post('/signup', createUser);
router.post('/activation', validateToken);
router.post('/login', loginUser);
router.get('/getuser', isAuthenticated, getUserInCookie);

router.get('/logout', isAuthenticated, logoutUser);
router.patch('/updateInfo', isAuthenticated, updateUserInfo);
router.patch('/updateAddresses', isAuthenticated, updateUserAddresses);
router.delete('/deleteAddress/:id', isAuthenticated, deleteAddress);
router.patch('/updatePassword', isAuthenticated, updateUserPw);

router.post('/loginAdmin', loginAdmin);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUserById);


module.exports = router;