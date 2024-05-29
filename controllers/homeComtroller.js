const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const activityModule = require('../models/activityModule');
const activityModel = require('../models/activityModule');
const { response } = require('express');
const { render } = require('pug');
require('../util/redis').getRedis();

exports.GET_HomeSV = (req, res, next) => {
  res.render('home/homeSV', {
    isLogin: true,
  });
}

exports.Get_Home = async (req, res, next) => {
  if (req.session == null){
    return res.redirect('/account/login');
  } else {
    console.log(req.session.id);
    const Activity = await activityModel.GetallActivity();
    console.log(Activity);
    // if (req.session.role == 'STUDENT')
    if (true) {
      res.render('home/homeSV', {
        Activities: Activity,
      })
    } else if (req.session.role == 'ORGANIZATION') {

    }
  }
}


exports.GET_HomeNTC = async (req, res, next) => {
  async function GetAllFaculty() {
    return activityModule.GetallActivity();
  }
  const AllAct = await GetAllFaculty();

  res.render('home/homeNTC', {
    isLogin: true,
    activitys: AllAct,
  });
}

