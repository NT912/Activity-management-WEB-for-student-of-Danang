const router = require('express').Router();

const controller = require('../controllers/user');

router.get('/list', controller.getList);
router.get('/:user_id/view', controller.getView);
router.get('/add', controller.getAdd);
router.post('/add/student', controller.addStudent);
router.post('/add/organization', controller.addOrganization);
router.get('/:user_id/edit', controller.getEdit);
router.post('/:user_id/edit', controller.edit);
router.get('/:user_id/delete', controller.delete);

module.exports = router;
