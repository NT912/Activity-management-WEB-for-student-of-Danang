
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const authModel = require('../models/authModel');
const db = require('../util/database');
const { response } = require('express');
require('../util/redis').getRedis();

exports.GET_Login= (req, res, next) => {
    res.render('home/login',{
      error: ''
    });
}

exports.GET_RegisterRole= (req, res, next) => {
  res.render('home/registerRole',{
    error: '',
  });
}

exports.GET_RegisterSV= async (req, res, next) => {
  async function GetAllFaculty() {
    return authModel.GetAllFaculty();
  }
  const facultys = await GetAllFaculty();
  res.render('home/registerStudent',{
    error: '',
    Facultys: facultys
  });
}

exports.GET_RegisterNTC= (req, res, next) => {
  res.render('home/registerNTC',{
    error: '',
  });
}

exports.POST_RegisterSV = async (req, res, next) => {
  const {name, masv, classs, falcuty, password, confirmpassword} = req.body;
  // const error = validationResult(req);
  // if (!error)
  // {
  //   return res.status(422).render('home/register',{
  //       error: error.msg,
  //   });
  // }
  // else
    async function registerUser() {
      try {
        const countEmailResult = await authModel.CountMasv(masv);
        if (countEmailResult[0].countMasv > 0) {
          return {
            error: "Ma sinh vien '" + masv+ "'da duoc dang ky tai khoan"
          };
        }
        if (password != confirmpassword)
        {
          return {
            error: "Passwords have to match!"
          };
        }
        const hashPass = await bcrypt.hash(password, 10);

        authModel.AddNewStudent(masv, name, falcuty, classs ,hashPass, (err, res) => {
          if (err) {
            console.log(err);
          }
          else{
          }
        })
        return{
          error:""
        }
      } catch (err) {
        console.log(err);
        return {
          error: "An error occurred"
        };
      }
    }

    // Sử dụng hàm registerUser
    registerUser()
      .then((result) => {
        if (result.error) {
          res.render('home/registerStudent', {
            error: result.error
          });
        }
        else
        {
          res.redirect('/account/login');
        }
      }
    )
    .catch((error) => {
      console.log(error);
      res.render('home/registerSV', {
        error: "An error occurred"
      });
    });
}

exports.POST_RegisterNTC = async (req, res, next) => {
  const { name, email, password, confirmpassword } = req.body;

  try {
      const countEmail = await authModel.CountEmail(email);
      const countname = await authModel.CountName(name);

      if (countEmail[0].countEmail > 0) {
          return res.render('home/registerNTC', {
              err: email + "'da duoc dang ky tai khoan"
          });
      } else if (countname[0].countName > 0) {
          return res.render('home/registerNTC', {
              err: "Ten da ton tai"
          });
      }

      if (password !== confirmpassword) {
          return res.render('home/registerNTC', {
              err: "Passwords have to match!"
          });
      }

      const hashPass = await bcrypt.hash(password, 10);

      // Lưu dữ liệu vào cơ sở dữ liệu
      await authModel.AddNewOrganization(name, email, hashPass);

      // Chuyển hướng trang sau khi dữ liệu được lưu thành công
      return res.redirect('/account/login');
  } catch (error) {
      console.log(error);
      return res.render('home/registerNTC', {
          err: "An error occurred"
      });
  }
}


exports.postLogin = async (req, response, next) => {
  const { userID, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  //  const error = validationResult(req);

    async function Login() {
      try {
        let GetAccCheckLogin;
        let NTC = true;
        if (emailRegex.test(userID)) {
          GetAccCheckLogin = await authModel.CheckLoginNTC(userID);
        }
        else {
          GetAccCheckLogin = await authModel.CheckLoginStudent(userID);
          NTC = false;
        }
        if (GetAccCheckLogin[0].hashpassword == 0) {
          return {
            error: " was not registered"
          };
        }
        else{
          const isMatchPass = await bcrypt.compare(password,GetAccCheckLogin[0].hashpassword);
          if (!isMatchPass)
          {
            return {
              error: "Wrong email or password"
            };
          }
          else{
            return {
              error: '',
              NTC: NTC,
            }
          }
        }
      } catch (err) {
        console.log(err);
        return {
          error: "An error occurred"
        };
      }
    }


    // Sử dụng hàm registerUser
    Login()
      .then((result) => {
        console.log(result.error);
        if (result.error){
          response.render('home/login', {
            error: result.error,
          });
        }
        else
        {
          if (result.NTC)
            response.redirect('/home/NTC');
          else
          response.redirect('/home/SV');
        }
      }
    )
    .catch((er) => {
      console.log(er);
      response.render('home/login', {
        error: "An error occurred"
      });
    });
  }

// HACKSAW RIDGE" (2016),
