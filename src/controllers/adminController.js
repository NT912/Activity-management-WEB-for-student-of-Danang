const qrcode = require('qrcode');
const fs = require('fs');

const organizationModel = require('../models/organizationModel');
const ExcelJS = require('exceljs');
const facultyModel = require('../models/facultyModel');
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
        const mod = req.query.mod;
        let activities;
        var state = '';
        var student_users;
        var organization_users;
        if (mod == 'wait'){
            activities = await activityModel.GetAllWaitConfirm(0);
            state = 'wait';
        } else
        if (mod == 'account'){
            student_users = await userModel.getByRole(roles.STUDENT);
            organization_users = await userModel.getByRole(roles.ORGANIZATION);
            state = 'account';
        } else {
            activities = await activityModel.GetAll(0);
        }

        const userss = req.session.user;
        res.render('admin/home', {
        activities: activities,
        userss: userss,
        announc: req.flash('announc'),
        state: state,
        student_users,
        organization_users
        });
    } catch (err){
        console.log(err);
    }
}

adminController.get_ViewActivity = async (req, res) => {
    try{
        const userss = req.session.user;
        const activity_id = req.params.activity_id;
        console.log(activity_id);
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

adminController.post_ConfirmActivity = async (req, res) => {
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
        var result = false;
        if (stateact == 'yet'){
            result = await activityModel.ChangeState('confirm',activity_id);
        } else 
        if (stateact == 'reject') {
            result = await activityModel.ChangeState('confirm',activity_id);
        } else 
        if (stateact == 'update') {
            result = await activityModel.ChangeState('confirm',activity_id);
        }

        if (!result){
            throw Error('Sai sai roi');
        }
        req.flash('announc','Duyet hoat dong thanh cong');
        res.redirect(`/admin/activity/${activity_id}/view`);
    } catch (err){
        console.log(err);
        req.flash('announc',err.message);
        res.redirect(`/admin/activity/${req.params.activity_id}/view`);
    }
}

adminController.post_RejectActivity = async (req, res) => {
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
        var result = false;
        if (stateact == 'yet'){
            result = await activityModel.ChangeState('reject',activity_id);
        } else 
        if (stateact == 'confirm') {
            result = await activityModel.ChangeState('yet',activity_id);
        } else 
        if (stateact == 'update') {
            const activity_backup = await activityModel.GetBackupActivity(activity_id);
            if (activity_backup){
                result = activityModel.update(activity_id,activity_backup);
                if (!result){
                    throw Error('Loi backup');
                }
            }
        }

        if (!result){
            throw Error('Sai sai roi');
        }
        req.flash('announc','Ban da tu choi hoat dong');
        res.redirect(`/admin/activity/${activity_id}/view`);
    } catch (err){
        console.log(err);
        req.flash('announc',err.message);
        res.redirect(`/admin/activity/${req.params.activity_id}/view`);
    }
}

adminController.Get_EditUser = async (req, res) => {
    try {
        const userss = req.session.user;
      const user_id = req.params.user_id;

        const user = await userModel.getById(user_id);
        if (user.role == roles.STUDENT){
          const user = await studentModel.GetProfileById(user_id);
          const faculty = await facultyModel.getAllFaculty();
          user.role = 'student';
          console.log(user);
          return res.render('admin/editUser', {
            userss: userss,
            user: user,
            error: req.flash('error'),
            faculties: faculty,
          });
        } 
        else 
        if (user.role == roles.ORGANIZATION){
          const user = await organizationModel.GetProfileById(user_id);
          user.role = 'organization';
          console.log(user);
          return res.render('admin/editUser', {
            userss: userss,
            error: '',
            user: user,
          });
        }
      return res.redirect('/admin/?mod=account');
    } catch (error) {
      console.log(error);
      req.flash('error', error.message);
      res.redirect('/user/profile');
    }
  }

  adminController.Get_Profile = async (req, res) => {
    try {
        const userss = req.session.user;

        
          return res.render('admin/profile',{
            userss: userss,
          });
    } catch (error) {
      console.log(error);
      req.flash('error', error.message);
      res.redirect('/user/profile');
    }
  }


