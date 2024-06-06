const md5 = require('md5');

const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');
const organizationModel = require('../models/organizationModel');
const adminModel = require('../models/adminModel');
const activityModel = require('../models/activityModel');
const { roles } = require('../constants');

const homeController = module.exports;

homeController.Get_Home = async (req, res) => {

  let activities = await activityModel.GetAll(10);
  const userss = req.session.user;

  if (userss && userss.role == roles.ADMIN){
    return res.redirect('/admin/');
  }
  res.render('home/homeNTC', {
    activities: activities,
    userss: userss,
    announc: req.flash('announc'),
  });
}