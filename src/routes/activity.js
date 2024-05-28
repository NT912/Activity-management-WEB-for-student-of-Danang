const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const { static_paths } = require('../constants');
const controller = require('../controllers/activity');
const authMiddleware = require('../middlewares/auth');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // Create the directory if it doesn't exist
      if (!fs.existsSync(static_paths.IMAGES)) {
        fs.mkdirSync(static_paths.IMAGES, { recursive: true });
      }
      callback(null, static_paths.IMAGES);
    },
    filename: (req, file, callback) => {
      const imageName = `${Date.now()}_${uuidv4()}_${file.originalname.replace(/ /g, "_")}`;
      callback(null, imageName);
    },
  })
});

router.get('/list', authMiddleware.isOrganizationOrAdmin, controller.getList);
router.get('/:activity_id/view', controller.getView);

router.get('/add', authMiddleware.isOrganizationOrAdmin, controller.getAdd);
router.post('/add', authMiddleware.isOrganizationOrAdmin, upload.single('image'), controller.add);

router.get('/:activity_id/edit', authMiddleware.isOrganizationOrAdmin, controller.getEdit);
router.post('/:activity_id/edit', authMiddleware.isOrganizationOrAdmin, upload.single('image'), controller.edit);

router.get('/:activity_id/verify', authMiddleware.isAdmin, controller.verify);
router.get('/:activity_id/unverify', authMiddleware.isAdmin, controller.unverify);

router.get('/:activity_id/register', authMiddleware.isStudent, controller.register);
router.get('/:activity_id/unregister', authMiddleware.isStudent, controller.unregister);

router.get('/search', controller.search);
router.get('/my_activity', authMiddleware.isStudent, controller.my_activity);

router.get('/:activity_id/qrcode_attendance', authMiddleware.isOrganization, controller.qrcode_attendance);
router.get('/:activity_id/attendance', authMiddleware.isStudent, controller.attendance);

module.exports = router;
