
const path = require('path');

const express = require('express');

const HomeController = require('../controllers/homeComtroller');

const router = express.Router();

// router.get("", HomeController.GET_HomeSV);

router.get("/", HomeController.Get_Home);


module.exports = router;