const qrcode = require('qrcode');
const fs = require('fs');

const organizationModel = require('../models/organizationModel');
const ExcelJS = require('exceljs');
const activityModel = require('../models/activityModel');
const datetimeUtils = require('../utils/datetime');
const pathUtils = require('../utils/path');
const { public_domain } = require('../config');
const firebase = require('../utils/firebase');
const multer = require('multer');
const { error } = require('console');
const bodyParser = require('body-parser');
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
const { roles, state_activity, state } = require('../constants');
const { url } = require('inspector');

const adminController = module.exports;

class Activity {
  constructor(
    idOrganization,
    name,
    date_start,
    date_end,
    date_start_regis,
    date_end_regis,
    location,
    desc,
    poster
  ) {
    this.idOrganization = idOrganization,
    this.name = name;
    this.date_start = date_start;
    this.date_end = date_end;
    this.date_start_regis = date_start_regis;
    this.date_end_regis = date_end_regis;
    this.location = location;
    this.desc = desc;
    this.poster = poster;
  }
}

adminController.Get_Home = async (req, res) => {
    try {
        let activities = await activityModel.GetAll(10);
        const userss = req.session.user;
        res.render('admin/home', {
        activities: activities,
        userss: userss,
        announc: req.flash('announc'),
        });
    } catch (err){
        console.log(err);
    }
}

adminController.get_ViewActivity = async (req, res) => {
    try{
        const userss = req.session.user;
        const activity_id = req.params.activity_id;
        const activity = await activityModel.GetById(activity_id);
        
        if (!activity) {
            req.flash('announc', 'Hoạt động không tồn tại');
            res.redirect('/admin/');
            return;
        }

        const stateact = activity.Confirm.toString();
        const state_activity = state[stateact];
      
        return res.render('admin/viewActivity', {
          userss: userss,
          activity: activity,
          stateact: stateact,
          state: state_activity,
          announc: req.flash('announc'),
        });
    } catch (err){
        console.log(err);
      req.flash('announc','Loi xem hoat dong');
      res.redirect('/');
    }
    
  }
