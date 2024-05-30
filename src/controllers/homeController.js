const md5 = require('md5');

const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');
const organizationModel = require('../models/organizationModel');
const adminModel = require('../models/adminModel');
const activityModel = require('../models/activityModel');
const { roles } = require('../constants');

const homeController = module.exports;

homeController.Get_Home = async (req, res) => {
    let activities = await activityModel.getAll(10);

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
}