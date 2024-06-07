const md5 = require('md5');

const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');
const organizationModel = require('../models/organizationModel');
const adminModel = require('../models/adminModel');
const facultyModel = require('../models/facultyModel');
const { roles } = require('../constants');
const { sendEmail, createResetToken } = require('../utils/emailer');

const authController = module.exports;

authController.getLogin = (req, res) => {
  const userss = req.session.user;
  if (userss)
  {
    return res.redirect('/');
  }
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
      throw Error("Tài khoản không tồn tại")
    } 

    if (user.hashed_password !== md5(password)) {
      throw new Error('Mật khẩu không chính xác');
    }

    let avt;
    if (user.role === roles.STUDENT) {
      req.flash('announc', `Chào mừng sinh viên ${user.username}`);
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
    req.flash('announc','Đăng ký tài khoản mới thành công');
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
      throw Error('Tên nhà tổ chức đã tồn tại');
    } 

    const _organization = await userModel.getByUserEmail(email);  
    if (_organization) {
      throw Error('Email đã đucợ đăng ký tài khoản');
    } 

    const admin = await userModel.GetAdminByemail(email);
    if (admin) {
      throw Error('Email đã đucợ đăng ký tài khoản');
    } 

    if (password != confirmpassword){
      throw Error('Mật khẩu phải trùng nhau');
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
    req.flash('announc','Đăng ký tài khoản mới thành công ');
    return res.redirect('/');
    
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

authController.Get_forgot = async (req, res) => {
  req.session.destroy();
  res.render('auth/fogot');
}

authController.Post_forgot = async (req, res) => {
  const { email } = req.body;
  let user = await userModel.GetSvByEmail(email);
  if (!user){
      user = await userModel.GetOrganiAcByEmail(email); 
  }

  if (!user) {
      req.flash('error', 'Email không tồn tại trong hệ thống');
      return res.redirect('/forgot-password');
  }

  // Tạo token đặt lại mật khẩu và lưu vào cơ sở dữ liệu
  const token = createResetToken();
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000);
  console.log(user);
  await userModel.updateToken(user);
  console.log("here");

  // Gửi email với đường dẫn đặt lại mật khẩu
  const resetLink = `http://127.0.0.1:3200/auth/resetpassword/${token}`;
  const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
  Please click on the following link, or paste this into your browser to complete the process:\n\n
  ${resetLink}\n\n
  If you did not request this, please ignore this email and your password will remain unchanged.\n`;

  try {
    console.log('herer');
      await sendEmail({ email: user.email, subject: 'Password Reset', message });
      req.flash('info', 'Email đã được gửi đến địa chỉ của bạn với hướng dẫn đặt lại mật khẩu.');
  } catch (error) {
      console.error('There was an error: ', error);
      req.flash('error', 'Có lỗi xảy ra khi gửi email.');
  }

  res.redirect('/');
};

authController.Get_ResetPass = async (req, res) => {
  const user = await userModel.getUserByResetToken(req.params.token);
    if (!user) {
        req.flash('error', 'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
        return res.redirect('/auth/fogot');
    }

  res.render('auth/resetpass', { token: req.params.token });
};

authController.Post_ResetPass = async (req, res) => {
  const user = await userModel.getUserByResetToken({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
      req.flash('error', 'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
      return res.redirect('/auth/forgot');
  }

  // Cập nhật mật khẩu mới
  user.password = req.body.password; // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await userModel.updatePass(req.body.password, user.id);
 

  req.flash('success', 'Mật khẩu của bạn đã được cập nhật thành công.');
  res.redirect('/auth/login');
};
