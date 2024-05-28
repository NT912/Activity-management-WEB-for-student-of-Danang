const router = require('express').Router();

const activityModel = require('../models/activity');
const datetimeUtils = require('../utils/datetime');
const pathUtils = require('../utils/path');

router.get('/', async (req, res) => {
  let activities = await activityModel.getAll(withOrganization = true);

  activities = activities.filter(activity => activity.admin_id );

  res.render('home', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    activities,
    datetimeUtils,
    pathUtils
  });
});

module.exports = router;
