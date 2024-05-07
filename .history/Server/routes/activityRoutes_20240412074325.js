// activityRoutes.js
const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateUser, activityController.createActivity);
router.put('/:id', authMiddleware.authenticateUser, activityController.updateActivity);
router.delete('/:id', authMiddleware.authenticateUser, activityController.deleteActivity);
router.get('/', authMiddleware.authenticateUser, activityController.getActivities);

module.exports = router;
