const md5 = require('md5');

const userModel = require('../models/user');
const studentModel = require('../models/student');
const organizationModel = require('../models/organization');
const adminModel = require('../models/admin');
const { roles } = require('../constants');


const authController = module.exports;

authController.getLogin = (req, res) => {
  res.render('login', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user ?? null,
    student: req.session.student ?? null,
    admin: req.session.admin ?? null,
  });
}

authController.login = async (req, res) => {
  try {
    const user = await userModel.getByUsername(req.body.username);

    if (!user) {
      throw new Error('Tài khoản không tồn tại');
    }

    if (user.hashed_password !== md5(req.body.password)) {
      throw new Error('Mật khẩu không chính xác');
    }

    req.session.user = user;

    if (user.role === roles.STUDENT) {
      const student = await studentModel.getByUserId(user.id);

      req.session.student = student;
      req.session.save();

      req.flash('success', `Chào mừng sinh viên ${student.fullname} | ${student.id}!`);
    } else if (user.role === roles.ORGANIZATION) {
      const organization = await organizationModel.getByUserId(user.id);

      if (!organization) {
        throw new Error('Tổ chức không tồn tại');
      }

      req.session.organization = organization;
      req.session.save();

      req.flash('success', `Chào mừng tổ chức ${organization.name}!`);
    } else if (user.role === roles.ADMIN) {
      const admin = await adminModel.getByUserId(user.id);

      req.session.admin = admin;
      req.session.save();

      req.flash('success', `Chào mừng quản trị viên ${admin.fullname}!`);
    } else {
      throw new Error('Quyền truy cập không hợp lệ');
    }

    return res.redirect(req.session.previous_url ?? '/');
  } catch (error) {
    req.flash('error', error.message);

    return res.redirect('/auth/login');
  }
}

authController.getRegister = (req, res) => {
  res.render('register', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user ?? null,
    student: req.session.student ?? null,
    admin: req.session.admin ?? null,
  });
}

authController.registerStudent = async (req, res) => {
  try {
    const _user = await userModel.getByUsername(req.body.username);

    if (_user) {
      throw new Error('Tài khoản đã tồn tại');
    }

    const _student = await studentModel.getById(req.body.student_id);

    if (_student) {
      throw new Error('Mã sinh viên đã tồn tại');
    }

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.STUDENT,
    });

    if (!user) {
      throw new Error('Có lỗi xảy ra khi đăng ký tài khoản');
    }

    const student = await studentModel.create({
      id: req.body.student_id,
      fullname: req.body.fullname,
      user_id: user.id,
      faculty: req.body.faculty,
      class: req.body.class,
      email: req.body.email,
      phone: req.body.phone
    });

    if (!student) {
      await userModel.delete(user.id);

      throw new Error('Có lỗi xảy ra khi đăng ký thông tin sinh viên');
    }

    req.flash('success', `Chào mừng sinh viên ${student.fullname} | ${student.id}!`);

    req.session.user = user;
    req.session.student = student;
    req.session.save();

    return res.redirect('/');
  } catch (error) {
    req.flash('error', error.message);

    return res.redirect('/auth/register');
  }
}

authController.registerOrganization = async (req, res) => {
  try {
    const _user = await userModel.getByUsername(req.body.username);

    if (_user) {
      throw new Error('Tài khoản đã tồn tại');
    }

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.ORGANIZATION,
    });

    if (!user) {
      throw new Error('Có lỗi xảy ra khi đăng ký tài khoản');
    }

    const organization = await organizationModel.create({
      user_id: user.id,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone
    });

    if (!organization) {
      await userModel.delete(user.id);

      throw new Error('Có lỗi xảy ra khi đăng ký thông tin tổ chức');
    }

    req.flash('success', `Chào mừng tổ chức ${organization.name}!`);

    req.session.user = user;
    req.session.organization = organization;
    req.session.save();

    return res.redirect('/');
  } catch (error) {
    req.flash('error', error.message);

    return res.redirect('/auth/register');
  }
}

authController.logout = async (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
}
