const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const activityModule = require('../models/activityModule');
const db = require('../models/activityModule');
const { response } = require('express');
require('../util/redis').getRedis();

exports.GET_HomeSV = (req, res, next) => {
  res.render('home/homeSV', {
    isLogin: true,
  });
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

