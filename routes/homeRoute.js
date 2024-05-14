
const path = require('path');

const express = require('express');

const HomeController = require('../controllers/homeComtroller');

const router = express.Router();

router.get("/SV", HomeController.GET_HomeSV);

router.get("/NTC", HomeController.GET_HomeNTC);



module.exports = router;