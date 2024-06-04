const qrcode = require('qrcode');
const fs = require('fs');

const organizationModel = require('../models/organizationModel');
const activityModel = require('../models/activityModel');
const datetimeUtils = require('../utils/datetime');
const pathUtils = require('../utils/path');
const { public_domain } = require('../config');
const firebase = require('../utils/firebase');
const multer = require('multer');
const { error } = require('console');
const bodyParser = require('body-parser');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const { roles } = require('../constants');

const activityController = module.exports;

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

activityController.getList = async (req, res) => {
  const activities = await activityModel.getAll(withOrganization = true, organization = req.session.organization);

  res.render('activity/list', {
    announc: req.flash('success'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activities
  });
}

activityController.getView = async (req, res) => {
  const userss = req.session.user;
  const idAct = req.params.activity_id;
  const activity = await activityModel.GetById(idAct);
  
  if (!activity) {
    req.flash('announc', 'Hoạt động không tồn tại');
    res.redirect('/activity/list');
    return;
  }
  // user is student
  if (userss == null || userss.role == roles.STUDENT)
  {
    let allowRegister = false;

    // check time register
    const now = new Date();
    const startRegiDate = new Date(activity.registration_start_date);
    const endRegiDate = new Date(activity.registration_end_date);
    if (now >= startRegiDate && now <= endRegiDate) {
      allowRegister = true;
    } 

    // check register
    var registered = false;
    if (userss != null && userss.role == roles.STUDENT){
      registered = await activityModel.isRegistered(idAct, userss.id);
    }

    console.log(req.flash('announc'));
    return res.render('activity/viewSV', {
      userss: userss,
      activity: activity,
      allowRegister: allowRegister,
      registered: registered,
      announc: req.flash('announc'),
    });
  } else 
  // User is organization
  if (userss.role == roles.ORGANIZATION)
  {
    let isOwn = userss.id == idAct;
    return res.render('activity/viewNTC', {
      userss: userss,
      activity: activity,
      allowRegister: null,
      registered: null,
      isOwn: isOwn,
    });
  }
  
  

  // activity.registered: = false;
  // activity.attendanced = false;

  // if (req.session.student) {
    // const registered = await activityModel.isRegistered(req.params.activity_id, req.session.student.id);
    // activity.registered = registered;

  //   const attendanced = await activityModel.isAttendanced(req.params.activity_id, req.session.student.id);
  //   activity.attendanced = attendanced;
  // }



  // const registrations = await activityModel.getActivityRegistrationsAttendences(
  //   req.params.activity_id,
  //   req.session.student ? req.session.student.id : null
  // )
}

activityController.registration = async (req, res) => {
  const userss = req.session.user;
  const activity_id = req.params.activity_id;

  const activities = await activityModel.GetById(activity_id);
  const list = await activityModel.GetListRegistationOfActivity(activity_id);
  console.log(userss);
  res.render('activity/listmember', {
    activity: activities,
    listmember: list,
    userss: userss,
    announc: req.flash('announc'),
  });
}


activityController.Get_AddActivity = async (req, res) => {
  const userss = req.session.user;
  if (!userss || (userss.role == 'student')){
    req.flash('announc','Ban khong duoc phep truy cap trang tao hoat dong');
    return res.redirect('/');
  }
  res.render('activity/createpost', {
    error: req.flash('announc'),
  });
}

activityController.add = async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role == roles.STUDENT)
    {
      req.flash('announc','Ban khong the tao hoat dong');
      return res.redirect('/');
    }
    const firebaseStore = getStorage();
    const currentTimestamp = Date.now();
    const StoreRef = ref(firebaseStore, `poster/${req.file.originalname} ${currentTimestamp}`);
    console.log(req.file);
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytesResumable(StoreRef,req.file.buffer, metadata);
    const url = await getDownloadURL(snapshot.ref);
    if (url)
    {
      const activity = await activityModel.add({
        name: req.body.name,
        organization_id: 25,
        description: req.body.desc,
        start_date: req.body.date_start,
        end_date: req.body.date_end,
        registration_start_date: req.body.date_start_regis,
        registration_end_date: req.body.date_end_regis,
        location: req.body.location,
        image: url,
      });
      if (!activity) {
        throw new Error('Có lỗi xảy ra khi thêm hoạt động');
      }
    } else {
      throw new Error('fail firebase');
    }

    req.flash('announc', `Ban da dang ky thanh cong hoat dong ${req.body.name}`);
  } catch (error) {
    req.flash('announc', error.message);
    res.redirect('/activity/create');
  }
}
activityController.getEdit = async (req, res) => {
  const organizations = await organizationModel.getAll();
  const activity = await activityModel.getById(req.params.activity_id);

  if (!activity) {
    req.flash('error', 'Hoạt động không toàn tại');
    res.redirect('/activity/list');
    return;
  }

  const registrations = await activityModel.getActivityRegistrationsAttendences(
    req.params.activity_id,
    req.session.student ? req.session.student.id : null
  )

  res.render('activity/edit', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activity: activity,
    organizations,
    datetimeUtils,
    pathUtils,
    registrations
  });
}

activityController.edit = async (req, res) => {
  try {
    const organization = await organizationModel.getById(req.body.organization_id);

    if (!organization) {
      throw new Error('Tổ chức không tồn tại');
    }

    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const updatedActivity = await activityModel.update(req.params.activity_id, {
      name: req.body.name,
      organization_id: req.body.organization_id,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      registration_start_date: req.body.registration_start_date,
      registration_end_date: req.body.registration_end_date,
      location: req.body.location,
      image: req.file ? req.file.path : activity.image,
      comment: req.body.comment
    });

    if (!updatedActivity) {
      throw new Error('Có lỗi xảy ra khi cập nhật hoạt động');
    }

    req.flash('success', `Cập nhật hoạt động ${req.body.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect('/activity/list');
}

activityController.verify = async (req, res) => {
  try {
    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const updatedActivity = await activityModel.verify(req.params.activity_id, req.session.admin.id);

    if (!updatedActivity) {
      throw new Error('Có lỗi xảy ra khi xác thực hoạt động');
    }

    req.flash('success', `Đã duyệt hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect('/activity/list');
}

activityController.unverify = async (req, res) => {
  try {
    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const updatedActivity = await activityModel.unverify(req.params.activity_id);

    if (!updatedActivity) {
      throw new Error('Có lỗi xảy ra khi bỏ xác thực hoạt động');
    }

    req.flash('success', `Đã bỏ duyệt hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect('/activity/list');
}

activityController.Get_register = async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    const userss = req.session.user;

    if (!userss)
    {
      return res.redirect('/auth/login');
    }

    if (userss.role != roles.STUDENT)
    {
      req.flash('announc',"Ban khong duoc phep dang ky tham gia hoat dong");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const activity = await activityModel.getById(activity_id);

    if (!activity) {
      req.flash('announc','Hoạt động không tồn tại');
      res.redirect('/');
    }

    const now = new Date();

    if (now < new Date(activity.registration_start_date) || now > new Date(activity.registration_end_date)) {
      req.flash('announc',"Hoat dong dang khong trong thoi han dang ky");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const isRegistered = await activityModel.isRegistered(req.params.activity_id, req.session.student.id);

    if (isRegistered) {
      req.flash('announc',"Ban da dang ky hoat dong nay");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const student = await studentModel.getSvRegister(req.session.user.id);
    return res.render('activity/register',{
      error: '',
      student: student,
    });

  } catch (error) {
    req.flash('error', error.message);
    const student = await studentModel.getSvRegister(req.session.user.id);
    return res.render('activity/register',{
      error: error,
      student: student,
      announc: req.flash('announc'),
    });
  }
}

activityController.Post_register = async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    const userss = req.session.user;

    if (!userss)
    {
      return res.redirect('/auth/login');
    }

    if (userss.role != roles.STUDENT)
    {
      req.flash('announc',"Ban khong duoc phep dang ky tham gia hoat dong");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      throw new Error('Hoat dong da bi xoa');
    }

    const now = new Date();

    if (now < new Date(activity.registration_start_date) || now > new Date(activity.registration_end_date)) {
      throw new Error('Đã hết thời gian đăng ký hoạt động');
    }

    const isRegistered = await activityModel.isRegistered(activity_id, userss.id);

    if (isRegistered) {
      throw new Error('Ban da dang ky hoat dong nay');
    }
    const {email, phone_number, wish} = req.body;
    if (!email || !phone_number)
    {
      throw new Error('Vui long nhap day du thong tin email va so dien thoai');
    }

    const result = await activityModel.register(activity_id, userss.id, email, phone_number, wish);

    if (!result) {
      throw new Error('Có lỗi xảy ra khi đăng ký hoạt động');
    }

    req.flash('announc', `Ban da dang ky tham gia hoat dong ${activity.name} thành công`);
    return res.redirect(`/activity/${activity_id}/view`);
  } catch (error) {
    req.flash('announc', error.message);
    const student = await studentModel.getSvRegister(req.session.user.id);
    return res.render('activity/register',{
      error: error,
      student: student,
    });
  }
}

activityController.unregister = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;
    if (!userss)
    {
      return res.redirect('/auth/login');
    }

    if (userss.role != roles.STUDENT)
    {
      req.flash('announc',"Ban khong duoc phep dang ky tham gia hoat dong");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const activity = await activityModel.GetById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const now = new Date();
    if (now < new Date(activity.registration_start_date) || now > new Date(activity.registration_end_date)) {
      throw new Error('Đã hết thời gian hủy đăng ký hoạt động');
    }

    var isRegistered = await activityModel.isRegistered(activity_id, userss.id);

    if (!isRegistered) {
      throw new Error('Bạn không thể hủy đăng ký khi chưa đăng ký');
    }

    const result = await activityModel.unregister(activity_id, userss.id);

    if (!result) {
      throw new Error('Có lỗi xảy ra khi hủy đăng ký hoạt động');
    }

    req.flash('success', `Hủy đăng ký hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
    console.log(error);
  }

  res.redirect(`/activity/${req.params.activity_id}/view`);
}

activityController.ConfirmRegisterSV = async (req, res) => {
  const { activity_id, student_id, is_confirmed } = req.query;
  const change = await activityModel.ChangeConfirmRegister(activity_id, student_id, is_confirmed);

  if (change) {
    return res.status(200).json({ message: 'success' });
  } else {
    return res.status(400).json({ message: 'fail' });
  }
}


activityController.search = async (req, res) => {
  const activities = await activityModel.search(req.query.q);

  res.render('home', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activities,
    datetimeUtils,
    pathUtils
  });
}

activityController.qrcode_attendance = async (req, res) => {
  const activity = await activityModel.getById(req.params.activity_id);

  if (!activity) {
    req.flash('error', 'Hoạt động không tồn tại');
    res.redirect('/activity/list');
    return;
  }

  const qrcodeContent = `${public_domain}/activity/${req.params.activity_id}/attendance`;
  const filePath = `public/qrcodes/${req.params.activity_id}.png`;

  if (!fs.existsSync('public/qrcodes')) {
    fs.mkdirSync('public/qrcodes', { recursive: true });
  }

  await qrcode.toFile(filePath, qrcodeContent);

  res.render('activity/qrcode_attendance', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activity,
    filePath,
    pathUtils
  });
}

activityController.attendance = async (req, res) => {
  try {
    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const now = new Date();

    if (now < new Date(activity.start_date) || now > new Date(activity.end_date)) {
      throw new Error('Đã hết thời gian điểm danh');
    }

    const registered = await activityModel.isRegistered(req.params.activity_id, req.session.student.id);

    if (!registered) {
      throw new Error('Bạn chưa đăng ký hoạt động này');
    }

    const attendanced = await activityModel.isAttendanced(req.params.activity_id, req.session.student.id);

    if (attendanced) {
      throw new Error('Bạn đã điểm danh rồi');
    }

    const result = await activityModel.attendance(req.params.activity_id, req.session.student.id);

    if (!result) {
      throw new Error('Có lỗi xảy ra khi điểm danh');
    }

    req.flash('success', `Điểm danh hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect(`/activity/${req.params.activity_id}/view`);
}

activityController.my_activity = async (req, res) => {
  const activities = await activityModel.getStudentActivities(req.session.student.id);

  res.render('activity/my_activity', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activities
  });
}

activityController.delete = async (req, res) => {
  try {
    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const result = await activityModel.delete(req.params.activity_id);

    if (!result) {
      throw new Error('Có lỗi xảy ra khi xóa hoạt động');
    }

    req.flash('success', `Xóa hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect('/activity/list');
}
