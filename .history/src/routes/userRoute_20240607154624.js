const router = require('express').Router();

const multer = require("multer");
const upload =multer({storage: multer.memoryStorage()});
const authMiddleware = require('../middlewares/auth');
const controller = require('../controllers/userController');
const { route } = require('./authRoute');

router.get('/list', authMiddleware.isAdmin, controller.getList);
// router.get('/:user_id/view', authMiddleware.isAdmin, controller.getView);

router.get('/add', authMiddleware.isAdmin, controller.getAdd);
router.post('/add/student', authMiddleware.isAdmin, controller.addStudent);
router.post('/add/organization', authMiddleware.isAdmin, controller.addOrganization);

// router.get('/:user_id/edit', authMiddleware.isAdmin, controller.getEdit);
router.get('/:user_id/delete', authMiddleware.isAdmin, controller.delete);

router.get('/profile', controller.Get_Profile);

router.get('/edit',controller.Get_Edit);
router.post('/edit',controller.Post_Edit);

router.post('/upload-avatar',upload.single('avatar'), controller.Post_avt);

router.get('/:user_id/view',controller.Get_ViewUser);






// router.post('/:user_id/edit', controller.edit);

module.exports = router;
