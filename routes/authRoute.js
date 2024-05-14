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
                // [
                //     check('email').isEmail().withMessage('Please enter valid message'),
                //     body(
                //         'name',
                //         'please enter name with only number and text within 5 to 30 characters'
                //     )
                //         .isLength({min: 5,max: 30})
                //         .isAlphanumeric(), 
                //     body(
                //         'password',
                //         'length of password from 8 to 50 character'
                //     )
                //         .isLength({min: 8,max: 50}),
                //     body('confirm_password').custom((value, {req}) =>
                //     {
                //         if (value !== req.body.password)
                //         {
                //             throw new Error('password have to match!');
                //         } else
                //         return true;
                //     })

                // ],
                authController.POST_RegisterSV);

router.post("/registerNTC", 
                // [
                //     check('email').isEmail().withMessage('Please enter valid message'),
                //     body(
                //         'name',
                //         'please enter name with only number and text within 5 to 30 characters'
                //     )
                //         .isLength({min: 5,max: 30})
                //         .isAlphanumeric(), 
                //     body(
                //         'password',
                //         'length of password from 8 to 50 character'
                //     )
                //         .isLength({min: 8,max: 50}),
                //     body('confirm_password').custom((value, {req}) =>
                //     {
                //         if (value !== req.body.password)
                //         {
                //             throw new Error('password have to match!');
                //         } else
                //         return true;
                //    
                // ],
                authController.POST_RegisterNTC);
                
router.post("/login",
                    // check('email').isEmail().withMessage('Please enter valid message'),
                    // body(
                    //     'password',
                    //     'length of password from 8 to 50 character'
                    // )
                    //     .isLength({min: 8,max: 50}), 
                    authController.postLogin);
                    
module.exports = router;
