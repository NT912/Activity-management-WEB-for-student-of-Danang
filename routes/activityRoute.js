const path = require('path');

const express = require('express');

const gameController = require('../controllers/activityController');

const multer = require("multer");
const upload =multer({storage: multer.memoryStorage()});


const router = express.Router();


router.get('/detail/:gameId', gameController.getGameDetail);

router.get('/create', gameController.GET_CreatePost);

router.post('/create',upload.single('poster'), gameController.POST_CreateActivity);

router.get('/register', gameController.GET_Register);

router.post('/addCategories', gameController.POST_AddNewCategorieGame);

router.post('/addCategoriOfGame/:gameId',gameController.POST_AddCatergorieOfGame);

module.exports = router;