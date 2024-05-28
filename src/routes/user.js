const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const controller = require('../controllers/user');

router.get('/list', authMiddleware.isAdmin, controller.getList);
router.get('/:user_id/view', authMiddleware.isAdmin, controller.getView);

router.get('/add', authMiddleware.isAdmin, controller.getAdd);
router.post('/add/student', authMiddleware.isAdmin, controller.addStudent);
router.post('/add/organization', authMiddleware.isAdmin, controller.addOrganization);

router.get('/:user_id/edit', authMiddleware.isAdmin, controller.getEdit);
router.post('/:user_id/edit', authMiddleware.isAdmin, controller.edit);
router.get('/:user_id/delete', authMiddleware.isAdmin, controller.delete);

router.get('/me', controller.getMe);
router.post('/me', controller.editMe);

module.exports = router;
