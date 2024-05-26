const router = require('express').Router();

const controller = require('../controllers/auth');

router.get('/login', controller.getLogin);
router.post('/login', controller.login);

router.get('/register', controller.getRegister);
router.post('/register/student', controller.registerStudent);
router.post('/register/organization', controller.registerOrganization);

router.get('/logout', controller.logout);

module.exports = router;
