const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const {static_paths} = require('../constants');
const controller = require('../controllers/activity');

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
      const imageName = `${Date.now()}_${uuidv4()}_${file.originalname.replace(/ /g,"_")}`;
      callback(null, imageName);
    },
  })
});

router.get('/list', controller.getList);
router.get('/:activity_id/view', controller.getView);

router.get('/add', controller.getAdd);
router.post('/add', upload.single('image'), controller.add);

module.exports = router;
