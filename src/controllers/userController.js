const facultyModel = require('../models/facultyModel');
const userModel = require('../models/userModel');
const studentModel = require('../models/studentModel');
const acitivityModel = require('../models/activityModel');
const organizationModel = require('../models/organizationModel');
const adminModel = require('../models/adminModel');
const registrationModel = require('../models/registrationModel');
const attendanceModel = require('../models/attendanceModel');
const { roles } = require('../constants');
const { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } = require('firebase/storage');
const md5 = require('md5');

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

    if (userss.role == roles.STUDENT){
      try {
        const user = await studentModel.GetProfileById(userss.id);
        var activities;
        var active;
        if (req.query.mod){
          const mod = req.query.mod;
          if (mod == 'joined'){
            active = 'joined';
            activities= await acitivityModel.GetActSVJoined(userss.id);
          } else 
          if (mod == 'saved') {
            active = 'saved';
            activities= await acitivityModel.GetActSave(userss.id);
          } else {
            return res.redirect('/user/profile');
          }
        } else {
            active = 'registered';
            activities = await acitivityModel.GetActSVRegistered(userss.id);
        }
        res.render('user/profileStudent',{
          User: user,
          activities: activities,
          active: active,
          userss: userss,
          announc: req.flash('announc'),
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
        var activities;
        var active;
        if (req.query.mod){
          const mod = req.query.mod;
          console.log(mod);
          if (mod == 'wait'){
            active = 'wait';
            activities= await acitivityModel.GetActNTCWait(userss.id);
          } else 
          if (mod == 'process') {
            active = 'process';
            activities= await acitivityModel.GetActNTCProcess(userss.id);
          }
          else 
          if (mod == 'saved') {
            active = 'saved';
            activities= await acitivityModel.GetActSave(userss.id);
          } else {
            return res.redirect('/user/profile');
          }
        } else {
            active = 'done';
            activities = await acitivityModel.GetActNTCDone(userss.id);
        }
        res.render('user/profileNTC',{
          User: user,
          activities: activities,
          active: active,
          userss: userss,
          announc: req.flash('announc'),
        });
      } catch (err){
        console.log(err);
        req.flash('announc', err.message);
        return res.redirect('/');
      }
    }
}

userController.Get_Edit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss){
      return res.redirect('/auth/login');
    }

    if (userss.role === roles.STUDENT) {
      const user = await studentModel.GetProfileById(userss.id);
      faculty = await facultyModel.getAllFaculty();
      return res.render('user/edit', {
        userss: userss,
        user: user,
        error: req.flash('error'),
        faculties: faculty,
      });
    } else 
    if (userss.role === roles.ORGANIZATION){
      const user = await organizationModel.GetProfileById(userss.id);
      return res.render('user/edit', {
        userss: userss,
        error: '',
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    req.flash('error', error.message);
    res.redirect('/user/profile');
  }
}

userController.Post_Edit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss){
      return res.redirect('/');
    }
    
    if (userss.role === roles.STUDENT) {
      const _student = await studentModel.getByUserId(userss.id);

      if (!_student) {
        throw new Error(`Tai khoan khong ton tai`);
      }

      const {username, masv, faculty, classs, email, phone} = req.body;
      if (!username || !masv || !faculty || !classs || !email || !phone){
          throw new Error(`Vui long nhap day du thong tin`);
      }
      
      const student_msv = await studentModel.getByMasv(masv);
      if (student_msv && student_msv.user_id != userss.id){
        throw new Error(`Ma sinh vien da ton tai`);
      }

      const student_email = await studentModel.getByEmail(email);
      if (student_email && student_email.user_id != userss.id){
        throw new Error(`Email da ton tai`);
      }
      const student = await studentModel.update(userss.id, {
        name: username,
        email: email,
        phone: phone,
        faculty: faculty,
        classs: classs,
        masv: masv,
      });

      if (!student){
          throw new Error(`Cap nhat thong tin khong thanh cong`);
      }
      req.flash('success', `Sinh viên ${student.fullname} | ${student.id} đã được cập nhật`);
      res.redirect('/user/profile');
    } else if (userss.role === roles.ORGANIZATION) {

      const organization = await organizationModel.getByUserId(userss.id);

      if (!organization) {
        throw new Error(`Tai khoan da bi xoa hoac khong ton tai`);
      }

      const {username, email, address, phone, description} = req.body;
      if (!username || !email || !address || !phone || !description || !phone){
          throw new Error(`Vui long nhap day du thong tin`);
      }

      const organization_email = await organizationModel.getByEmail(email);
      if (organization_email && organization_email.user_id != userss.id){
        throw new Error(`Email da ton tai`);
      }

      const check = await organizationModel.update(userss.id, {
        name: username,
        description: description,
        email: email,
        phone: phone,
        address: address
      });

      if (!check){
        throw new Error(`Cap nhat thong tin khong thanh cong`);
      }

      req.flash('success', `Tổ chức ${organization.name} đã được cập nhật`);
      res.redirect('/user/profile');
    }
  } catch (error) {
    console.log(error);
    req.flash('error', error.message);
    res.redirect('/user/edit');
  }
}
userController.edit = async (req, res) => {
  try {
    // const _user = await userModel.getById(req.params.user_id);

    // if (!_user) {
    //   throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    // }

    const userss = req.session.user;
    if (!userss){
      return res.redirect('/');
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

userController.Post_avt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try{
    const userss = req.session.user;

    if (!userss){
      throw Error('Ban chua dang nhap');
    }

    const firebaseStore = getStorage();
    const currentTimestamp = Date.now();
    const StoreRef = ref(firebaseStore, `avt-user/${req.file.originalname} ${currentTimestamp}`);
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(StoreRef,req.file.buffer, metadata);
    const url = await getDownloadURL(snapshot.ref);

    var result = false;
    if (url){
      if (userss.role == roles.STUDENT){
        result = await userModel.updateAvtSV(url,userss.id);
      } else 
      if (userss.role == roles.ORGANIZATION){
        result = await userModel.updateAvtNTC(url,userss.id);
      } 
    } else {
      throw Error('Loi up anh len firebase');
    }

    if (!result){
      throw Error('Loi up anh len databse');
    }

    return res.status(200).json({ newAvatarUrl: url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to upload avatar' });
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
