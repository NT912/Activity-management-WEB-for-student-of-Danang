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
  const users = req.session.user;
  let user;
  if (users)
  {
    if (users.role == 'organization'){
      user = await organizationModel.getByUserId(users.id);
    } else 
    if (users.role == 'student') {
      user = await studentModel.getByUserId(users.id);
    }
  }

  res.render('home/homeNTC', {
    activities: activities,
    userss: users,
    announc: req.flash('announc'),
  });
}