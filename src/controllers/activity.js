const organizationModel = require('../models/organization');
const activityModel = require('../models/activity');
const datetimeUtils = require('../utils/datetime');

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

  res.render('activity/view', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activity,
    organizations,
    datetimeUtils
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
