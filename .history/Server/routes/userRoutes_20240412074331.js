// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.authenticateUser, userController.getUserInfo);
router.put('/', authMiddleware.authenticateUser, userController.updateUserInfo);

module.exports = router;
