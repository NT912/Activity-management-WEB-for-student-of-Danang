const userModel = require('../models/user');
const studentModel = require('../models/student');
const organizationModel = require('../models/organization');
const registrationModel = require('../models/registration');
const attendanceModel = require('../models/attendance');
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

userController.getEdit = async (req, res) => {
  try {
    const user = await userModel.getById(req.params.user_id);

    if (!user) {
      throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    }

    if (user.role === roles.STUDENT) {
      const student = await studentModel.getByUserId(user.id);

      res.render('user/edit', {
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

      res.render('user/edit', {
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
