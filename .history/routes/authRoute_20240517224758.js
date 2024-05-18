const path = require('path');

const express = require('express');
const { check, body } =  require('express-validator')

const authController = require('../controllers/authController');
const { values } = require('mysql2/lib/constants/charset_encodings');

const router = express.Router();

router.get("/login", authController.GET_Login);

router.get("/registerRole", authController.GET_RegisterRole);

router.get("/registerSV", authController.GET_RegisterSV);

router.get("/registerNTC", authController.GET_RegisterNTC);

router.post("/registerSV", 
                authController.POST_RegisterSV);
router.post("/registerNTC", 
                
                authController.POST_RegisterNTC);
router.post("/login", 
                    authController.postLogin);
                    
module.exports = router;
