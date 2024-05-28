const qrcode = require('qrcode');
const fs = require('fs');

const organizationModel = require('../models/organization');
const activityModel = require('../models/activity');
const datetimeUtils = require('../utils/datetime');
const pathUtils = require('../utils/path');
const { public_domain } = require('../config');

const activityController = module.exports;

activityController.getList = async (req, res) => {
  const activities = await activityModel.getAll(withOrganization = true, organization = req.session.organization);

  res.render('activity/list', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activities
  });
}

activityController.getView = async (req, res) => {
  const organizations = await organizationModel.getAll();
  const activity = await activityModel.getById(req.params.activity_id);

  if (!activity) {
    req.flash('error', 'Hoạt động không tồn tại');
    res.redirect('/activity/list');
    return;
  }

  activity.registered = false;

  if (req.session.student) {
    const registered = await activityModel.isRegistered(req.params.activity_id, req.session.student.id);

    if (registered) {
      activity.registered = true;
    }
  }

  let allowRegister = false;
  const now = new Date();

  if (now >= new Date(activity.registration_start_date) && now <= new Date(activity.registration_end_date)) {
    allowRegister = true;
  }

  const registrations = await activityModel.getActivityRegistrationsAttendences(
    req.params.activity_id,
    req.session.student ? req.session.student.id : null
  )

  res.render('activity/view', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activity,
    organizations,
    datetimeUtils,
    pathUtils,
    allowRegister,
    registrations
  });
}

activityController.getAdd = async (req, res) => {
  const organizations = await organizationModel.getAll();

  res.render('activity/add', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    organizations
  });
}

activityController.add = async (req, res) => {
  try {
    const organization = await organizationModel.getById(req.body.organization_id);

    if (!organization) {
      throw new Error('Tổ chức không tồn tại');
    }

    const activity = await activityModel.add({
      name: req.body.name,
      organization_id: req.body.organization_id,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      registration_start_date: req.body.registration_start_date,
      registration_end_date: req.body.registration_end_date,
      location: req.body.location,
      image: req.file.path,
    });

    if (!activity) {
      throw new Error('Có lỗi xảy ra khi thêm hoạt động');
    }

    req.flash('success', `Thêm hoạt động ${req.body.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect('/activity/list');
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
    activity,
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

activityController.register = async (req, res) => {
  try {
    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const result = await activityModel.register(req.params.activity_id, req.session.student.id);

    if (!result) {
      throw new Error('Có lỗi xảy ra khi đăng ký hoạt động');
    }

    req.flash('success', `Đăng ký hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect(`/activity/${req.params.activity_id}/view`);
}

activityController.unregister = async (req, res) => {
  try {
    const activity = await activityModel.getById(req.params.activity_id);

    if (!activity) {
      throw new Error('Hoạt động không tồn tại');
    }

    const result = await activityModel.unregister(req.params.activity_id, req.session.student.id);

    if (!result) {
      throw new Error('Có lỗi xảy ra khi hủy đăng ký hoạt động');
    }

    req.flash('success', `Hủy đăng ký hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash('error', error.message);
  }

  res.redirect(`/activity/${req.params.activity_id}/view`);
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
  const activity = await activityModel.getById(req.params.activity_id);

  if (!activity) {
    req.flash('error', 'Hoạt động không tồn tại');
    res.redirect('/activity/list');
    return;
  }

  const result = await activityModel.attendance(req.params.activity_id, req.session.student.id);

  if (!result) {
    req.flash('error', 'Có lỗi xảy ra khi điểm danh');
    res.redirect(`/activity/${req.params.activity_id}/view`);
    return;
  }

  req.flash('success', 'Điểm danh thành công');
  res.redirect(`/activity/${req.params.activity_id}/view`);
}
