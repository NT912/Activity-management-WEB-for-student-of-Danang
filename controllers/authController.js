const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const authModel = require("../models/authModel");
const db = require("../util/database");
const session = require('express-session'); // session
const { response } = require('express');
require('../util/redis').getRedis();

exports.GET_Login = (req, res, next) => {
  if (req.session.id){
    return res.redirect('/');
  }
  res.render("auth/login", {
    error: "",
  });
};

exports.GET_RegisterRole = (req, res, next) => {
  res.render("auth/registerRole");
};

exports.GET_RegisterSV = async (req, res, next) => {
  try {
    const Facultys = await authModel.GetAllFaculty();
    res.render("auth/registerStudent", {
      error: "",
      Facultys: Facultys,
    });
  } catch (err) {
    console.error(err);
    res.render("auth/registerStudent", {
      error: "An error occurred while fetching faculties",
      Facultys: [],
    });
  }
};

exports.GET_RegisterNTC = (req, res, next) => {
  res.render("auth/registerNTC", {
    error: "",
  });
};

exports.POST_RegisterSV = async (req, res, next) => {
  const { name, masv, classs, falcuty, password, confirmpassword } = req.body;
  try {
    let err = '';
    const countEmailResult = await authModel.CountMasv(masv);
    if (countEmailResult[0].countMasv > 0) {
      err= `Ma sinh vien ${masv} da duoc dang ky tai khoan`;
    } else  if (password != confirmpassword) {
        err =  "Passwords have to match!";
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      authModel.AddNewStudent( masv, name, falcuty, classs, hashPass, (error, res) => {
          if (error) {
            console.log(error);
            err = `Register new account fail`;
          } else {
            err = ``;
          }
        }
      );
    }
    if (err === ''){
      res.redirect('/account/login');
    } else {
      const Facultys = await authModel.GetAllFaculty();
      res.render("auth/registerStudent", {
        error: err,
        Facultys: Facultys,
      });
    }
    
  } catch (err) {
    console.log(err);
    res.render("auth/registerRole");
  }
};

exports.POST_RegisterNTC = async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;
  try {
    let err = '';
    const countEmail = await authModel.CountEmail(email);
    const countname = await authModel.CountName(name);
    if (countEmail[0].countEmail > 0) {
        err = email + "da duoc dang ky tai khoan";
    } else if (countname[0].countName > 0) {
        err = "Ten da ton tai";
    } else 
    if (password != confirmpassword) {
        err = "Passwords have to match!";
    }else {
      const hashPass = await bcrypt.hash(password, 10);
      authModel.AddNewOrganization(name, email, hashPass, (err, res) => {
        if (err) {
          console.log(err);
          err = 'Tao tai khoan moi that bai';
        } else {
          err = '';
        }
      });
    }
    
    if (err == ''){
      res.redirect('/account/login');
    } else {
      res.render("auth/registerNTC", {
        error: err,
      });
    }
    
  } catch (err) {
    console.log(err);
    res.render("auth/registerNTC", {
      error: 'Tao tai khoan moi that bai',
    });
  }
};

exports.postLogin = async (req, response, next) => {
  const { userID, password } = req.body;
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var err = '';
    try {
      const GetAccCheckLogin = await authModel.CheckLogin(userID);
      if (GetAccCheckLogin == null) {
        err = "Email was not registered"
      }
      else{
        const isMatchPass = await bcrypt.compare(password,GetAccCheckLogin[0].hashpassword);
        if (!isMatchPass)
        {
          err = "Wrong email or password"
        }
      }
      if (err == '')
      {
        id = GetAccCheckLogin[0].id;
        role = GetAccCheckLogin[0].role;
        req.session.id = id;
        req.session.id = role;
        response.redirect('/');
      }
      else
      {
        console.log(err);
        response.render('home/login',{
          error: 'error',
        });
      }
    } catch (err) {
      console.log(err);
      return {
        error: "An error occurred"
      };
    }
};
exports.Get_LogOut = (req, res, next) => {
  if (req.session.id){
    console.log(req.session);
    req.session.destroy();
  }
};
