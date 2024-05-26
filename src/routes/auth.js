const router = require('express').Router();

const controller = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');

router.get('/login', authMiddleware.isLoggedOut, controller.getLogin);
router.post('/login', authMiddleware.isLoggedOut, controller.login);

router.get('/register', authMiddleware.isLoggedOut, controller.getRegister);
router.post('/register/student', authMiddleware.isLoggedOut, controller.registerStudent);
router.post('/register/organization', authMiddleware.isLoggedOut, controller.registerOrganization);

router.get('/logout', authMiddleware.isLoggedIn, controller.logout);

module.exports = router;
