const router = require('express').Router();

const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.get('/login', authMiddleware.isLoggedOut, controller.getLogin);
router.post('/login', authMiddleware.isLoggedOut, controller.login);

router.get('/register', authMiddleware.isLoggedOut, controller.GET_Register);

router.get('/register/student', authMiddleware.isLoggedOut, controller.GET_RegisterST);
router.post('/register/student', authMiddleware.isLoggedOut, controller.registerStudent);

router.get('/register/organization', authMiddleware.isLoggedOut, controller.GET_registerOrganization);
router.post('/register/organization', authMiddleware.isLoggedOut, controller.registerOrganization);

router.get('/logout', controller.logout);

module.exports = router;
