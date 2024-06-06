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
    announc: req.flash('announc'),
  });
}

authController.login = async (req, res) => {
  try {
    const {userID, password} = req.body;
    var user;
    user = await userModel.getByUserMasv(userID);
    if (!user){
      user = await userModel.GetOrganiAcByEmail(userID); 
      if (!user){
        user = await userModel.GetAdminByemail(userID);
      }
    }

    if (!user){
      throw Error("Tai khoan khong ton tai")
    } 

    if (user.hashed_password !== md5(password)) {
      throw new Error('Mật khẩu không chính xác');
    }

    let avt;
    if (user.role === roles.STUDENT) {
      req.flash('announc', `Chao sinh vien ${user.username}`);
      avt = await studentModel.GetAvtByMasv(userID);
    } else 
    if (user.role === roles.ORGANIZATION) {
      req.flash('announc', `Chào mừng tổ chức ${user.username}!`);
      avt = await organizationModel.GetAvtByEmail(userID);
    } else if (user.role === roles.ADMIN) {
      req.flash('announc', `Chào mừng quản trị viên ${user.username}!`);
      avt = await adminModel.GetAvtByEmail(userID);
    }

    var userss = {
      id: user.id,
      role: user.role,
      avt: avt,
    }
    req.session.user = userss;
    req.session.save();

    console.log(userss);
    if (userss.role == roles.ADMIN){
      return res.redirect('/admin/');
    }
    return res.redirect('/');
  
  } catch (error) {
    console.log(error);
    req.flash('error', error.message);
    return res.redirect('/auth/login');
  }
}

authController.GET_Register = (req, res) => {
  res.render('auth/registerRole');
}

authController.GET_RegisterST = async (req, res) => {
  const falcutys = await facultyModel.getAllFaculty();
  console.log(falcutys);
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

    if (!name || !masv || !classs || !falcuty || !password || !confirmpassword) {
      throw new Error('Vui lòng nhập đủ các trường');
    }
    
    const masvRegex = /^[a-zA-Z0-9]+$/;
    if (!masvRegex.test(masv)) {
      throw new Error('Mã sinh viên chỉ được chứa chữ cái và số');
    }
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
      faculty: falcuty,
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
    req.flash('announc','Dang ky tai khoan moi thanh cong');
    return res.redirect('/auth/login');
  }

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

    const admin = await userModel.GetAdminByemail(email);
    if (admin) {
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
    req.flash('announc','Dang ky tai khoan moi thanh cong');
    return res.redirect('/auth/login');
    
  } catch (error) {
    return res.render('auth/registerNTC',{
      error: error.message,
    });
  }
}

authController.logout = async (req, res) => {
  console.log("here");
  req.session.destroy();
  res.redirect('/auth/login');
}
