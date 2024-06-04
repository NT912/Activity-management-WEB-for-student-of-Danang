const router = require('express').Router();

const homeContoller = require('../controllers/homeController');
const datetimeUtils = require('../utils/datetime');
const pathUtils = require('../utils/path');

router.get('/', homeContoller.Get_Home);

module.exports = router;
