const facultyModel = require('../models/facultyModel');
const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');
const acitivityModel = require('../models/activityModel');
const organizationModel = require('../models/organizationModel');
const adminModel = require('../models/adminModel');
const registrationModel = require('../models/registrationModel');
const attendanceModel = require('../models/attendanceModel');
const { roles } = require('../constants');

const userController = module.exports;

userController.getList = async (req, res) => {
  const student_users = await userModel.getByRole(roles.STUDENT);
  const organization_users = await userModel.getByRole(roles.ORGANIZATION);

  res.render('user/list', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    student_users,
    organization_users
  });
}

userController.getAdd = async (req, res) => {
  res.render('user/add', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization
  });
}

userController.getView = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.user_id);

    if (!user) {
      throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    }

    if (user.role === roles.STUDENT) {
      const student = await studentModel.getByUserId(user.id);

      res.render('user/view', {
        success: req.flash('success'),
        error: req.flash('error'),
        user: req.session.user,
        student: req.session.student,
        admin: req.session.admin,
        organization: req.session.organization,
        _user: user,
        _student: student
      });
    } else if (user.role === roles.ORGANIZATION) {
      const organization = await organizationModel.getByUserId(user.id);

      res.render('user/view', {
        success: req.flash('success'),
        error: req.flash('error'),
        user: req.session.user,
        student: req.session.student,
        admin: req.session.admin,
        organization: req.session.organization,
        _user: user,
        _organization: organization
      });
    }
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/user/list');
  }
}

userController.addStudent = async (req, res) => {
  try {
    const _user = await userModel.getByUsername(req.body.username);

    if (_user) {
      throw new Error('Tài khoản đã tồn tại');
    }

    const _student = await studentModel.getById(req.body.student_id);

    if (_student) {
      throw new Error('Sinh viên đã tồn tại');
    }

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.STUDENT
    });

    const student = await studentModel.create({
      id: req.body.student_id,
      user_id: user.id,
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      faculty: req.body.faculty,
      class: req.body.class
    });

    req.flash('success', `Sinh viên ${student.fullname} | ${student.id} đã được thêm`);

    res.redirect('/user/list');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/user/add');
  }
}

userController.addOrganization = async (req, res) => {
  try {
    const _user = await userModel.getByUsername(req.body.username);

    if (_user) {
      throw new Error('Tài khoản đã tồn tại');
    }

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.ORGANIZATION
    });

    const organization = await organizationModel.create({
      user_id: user.id,
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    });

    req.flash('success', `Tổ chức ${organization.name} đã được thêm`);

    res.redirect('/user/list');
  }
  catch (error) {
    req.flash('error', error.message);
    res.redirect('/user/add');
  }
}



userController.Get_Profile = async (req, res) => {
    const userss = req.session.user;
    if (!userss) {
      return res.redirect('/auth/login');
    }

    console.log(userss.role);
    if (userss.role == roles.STUDENT){
      try {
        const user = await studentModel.GetProfileById(userss.id);
        const activities = await acitivityModel.GetActSVRegistered(userss.id);
        res.render('user/profileStudent',{
          User: user,
          activities: activities,
          userss: userss,
        });
      } catch (err){
        console.log(err);
        req.flash('announc', err.message);
        return res.redirect('/');
      }
    } else if (userss.role == roles.ORGANIZATION){
      try {
        const user = await organizationModel.GetProfileById(userss.id);
        // const activities = await acitivityModel.GetActSVRegistered(userss.id);
        res.render('user/profileNTC',{
          User: user,
          // activities: activities,
          userss: userss,
        });
      } catch (err){
        console.log(err);
        req.flash('announc', err.message);
        return res.redirect('/');
      }
    }
}

userController.get_Edit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss){
      return res.redirect('/auth/login');
    }

    var user;
    let faculty;
    if (userss.role === roles.STUDENT) {
      user = await studentModel.GetProfileById(userss.id);
      faculty = await facultyModel.getAllFaculty();

    } else if (userss.role === roles.ORGANIZATION){
      user = await organizationModel.GetProfileById(userss.id);
    }

    console.log(faculty);
    res.render('user/edit', {
      userss: userss,
      user: user,
      faculties: faculty,
    });
  } catch (error) {
    console.log(error);
    req.flash('error', error.message);
    res.redirect('/user/profile');
  }
}
userController.edit = async (req, res) => {
  try {
    const _user = await userModel.getById(req.params.user_id);

    if (!_user) {
      throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    }

    const user = await userModel.update(_user.id, {
      username: req.body.username,
      password: req.body.password
    });

    if (user.role === roles.STUDENT) {
      const _student = await studentModel.getByUserId(user.id);

      if (!_student) {
        throw new Error(`Sinh viên với ID ${req.params.user_id} không tồn tại`);
      }

      const student = await studentModel.update(_student.id, {
        id: req.body.student_id,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        faculty: req.body.faculty,
        class: req.body.class
      });

      await registrationModel.updateStudent(_student.id, student.id);
      await attendanceModel.updateStudent(_student.id, student.id);

      req.flash('success', `Sinh viên ${student.fullname} | ${student.id} đã được cập nhật`);

      res.redirect('/user/list');
    } else if (user.role === roles.ORGANIZATION) {

      const organization = await organizationModel.getByUserId(user.id);

      if (!organization) {
        throw new Error(`Tổ chức với ID ${req.params.user_id} không tồn tại`);
      }

      await organizationModel.update(organization.id, {
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      });

      req.flash('success', `Tổ chức ${organization.name} đã được cập nhật`);

      res.redirect('/user/list');

    }
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/user/list');
  }
}

userController.editMe = async (req, res) => {
  try {
    const user = await userModel.update(req.session.user.id, {
      username: req.body.username,
      password: req.body.password
    });

    if (user.role === roles.STUDENT) {
      const _student = await studentModel.getByUserId(user.id);

      if (!_student) {
        throw new Error(`Sinh viên với ID ${user.id} không tồn tại`);
      }

      await studentModel.update(_student.id, {
        id: req.body.student_id,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        faculty: req.body.faculty,
        class: req.body.class
      });
    } else if (user.role === roles.ORGANIZATION) {
      const organization = await organizationModel.getByUserId(user.id);

      if (!organization) {
        throw new Error(`Tổ chức với ID ${user.id} không tồn tại`);
      }

      await organizationModel.update(organization.id, {
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      });
    } else if (user.role === roles.ADMIN) {
      const admin = await adminModel.getByUserId(user.id);

      if (!admin) {
        throw new Error(`Quản trị viên với ID ${user.id} không tồn tại`);
      }

      await adminModel.update(admin.id, {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone
      });
    }

    req.flash('success', `Thông tin đã được cập nhật`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect('/user/me');
}

userController.delete = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.user_id);

    if (!user) {
      throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    }

    if (user.role === roles.STUDENT) {
      const student = await studentModel.getByUserId(user.id);

      if (!student) {
        throw new Error(`Sinh viên với ID ${req.params.user_id} không tồn tại`);
      }

      await registrationModel.deleteByStudentId(student.id);
      await attendanceModel.deleteByStudentId(student.id);
      await studentModel.delete(student.id);
    } else if (user.role === roles.ORGANIZATION) {
      const organization = await organizationModel.getByUserId(user.id);

      if (!organization) {
        throw new Error(`Tổ chức với ID ${req.params.user_id} không tồn tại`);
      }

      await organizationModel.delete(organization.id);
    }

    await userModel.delete(user.id);

    req.flash('success', `Tài khoản ${user.username} đã được xóa`);

    res.redirect('/user/list');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/user/list');
  }
}
