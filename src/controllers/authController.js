const md5 = require('md5');

const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');
const organizationModel = require('../models/organizationModel');
const adminModel = require('../models/adminModel');
const facultyModel = require('../models/facultyModel');
const { roles } = require('../constants');


const authController = module.exports;

authController.getLogin = (req, res) => {
  res.render('auth/login',{
    error: req.flash('error'),
    success: req.flash('success'),
  });
}

authController.login = async (req, res) => {
  try {
    const {userID, password} = req.body;
    var user;
    user = await userModel.GetUserByMasv(userID);
    if (!user){
      user = await userModel.GetOrganiAcByEmail(userID); 
    }

    if (!user){
      throw Error("Tai khoan khong ton tai")
    } 

    if (user.hashed_password !== md5(password)) {
      throw new Error('Mật khẩu không chính xác');
    }

    if (user.role === roles.STUDENT) {
      req.flash('success', `Chao sinh vien ${user.username}`);
    } else 
    if (user.role === roles.ORGANIZATION) {
      req.flash('success', `Chào mừng tổ chức ${user.username}!`);
    } else if (user.role === roles.ADMIN) {
      req.flash('success', `Chào mừng quản trị viên ${user.username}!`);
    }

    req.session.role = user.role;
    req.session.idUser = user.id;
    req.session.save();

    return res.redirect('/');
      // req.session.organization = organization;
      // req.session.save();
      // req.session.admin = admin;
      // req.session.save();
    // return res.redirect(req.session.previous_url ?? '/');
  } catch (error) {
    console.log(error);
    req.flash('error', error.message);
    return res.redirect('auth/login');
  }
}

authController.GET_Register = (req, res) => {
  res.render('auth/registerRole');
}

// authController.getRegister = (req, res) => {
//   res.render('auth/registerold', {
//     success: req.flash('success'),
//     error: req.flash('error'),
//     user: req.session.user ?? null,
//     student: req.session.student ?? null,
//     admin: req.session.admin ?? null,
//   });
// }
authController.GET_RegisterST = async (req, res) => {
  const falcutys = await facultyModel.getAllFaculty();
  res.render('auth/registerStudent',{
    error: '',
    Falculties: falcutys,
  });
}

authController.GET_registerOrganization = (req, res) => {
  res.render('auth/registerNTC',{
    error: req.flash('error'),
  });
}

authController.registerStudent = async (req, res) => {
  try {
    var err = '';
    const {name, masv, classs, falcuty, password, confirmpassword} = req.body;
    const _student = await userModel.getByUserMasv(req.body.masv);

    if (_student) {
      throw Error('Mã sinh viên đã tồn tại');
    } else 

    if (password != confirmpassword){
      throw Error('Mã sinh viên đã tồn tại');
    } 

    const user = await userModel.create({
      username: name,
      password: password,
      role: roles.STUDENT,
    });

    if (!user) {
      throw Error('Có lỗi xảy ra khi đăng ký tài khoản');
    } 

    const student = await studentModel.create({
      id: masv,
      user_id: user.id,
      faculty: falcuty,
      class: classs,
    });
    if (!student) {
      await userModel.delete(user.id);
      err = 'Có lỗi xảy ra khi đăng ký thông tin sinh viên';
    }
    req.flash('success','Dang ky tai khoan moi thanh cong');
    return res.redirect('/auth/login');
  }

    // req.flash('success', `Chào mừng sinh viên ${student.fullname} | ${student.id}!`);

    // req.session.user = user;
    // req.session.student = student;
    // req.session.save();

    // return res.redirect('/');
  catch (error) {
    const falcutys = await facultyModel.getAllFaculty();
    return res.render('auth/registerStudent',{
      error: error.message,
      Falculties: falcutys,
    });
  }
}

authController.registerOrganization = async (req, res) => {
  try {
    const {username, email, password, confirmpassword} = req.body;
    const _user = await userModel.getByUsername(username);
    if (_user) {
      throw Error('Ten nha to chuc da ton tai');
    } 

    const _organization = await userModel.getByUserEmail(email);  
    if (_organization) {
      throw Error('Email da duoc dang ky tai khoan');
    } 

    if (password != confirmpassword){
      throw Error('Mat khau phai trung nhau');
    } 

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.ORGANIZATION,
    });

    if (!user) {
      throw Error('Có lỗi xảy ra khi đăng ký tài khoản');
    }

    const organization = await organizationModel.create({
      user_id: user.id,
      email: req.body.email,
    });

    if (!organization) {
      await userModel.delete(user.id);
      throw Error('Có lỗi xảy ra khi đăng ký thông tin tổ chức');
    }
    req.flash('success','Dang ky tai khoan moi thanh cong');
    return res.redirect('/auth/login');
    
  } catch (error) {
    return res.render('auth/registerNTC',{
      error: error.message,
    });
  }
}

authController.logout = async (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
}
