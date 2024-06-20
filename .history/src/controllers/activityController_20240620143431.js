const qrcode = require("qrcode");
const fs = require("fs");

const registrationModel = require("../models/registrationModel");

const organizationModel = require("../models/organizationModel");
const ExcelJS = require("exceljs");
const activityModel = require("../models/activityModel");
const datetimeUtils = require("../utils/datetime");
const pathUtils = require("../utils/path");
const { public_domain } = require("../config");
const firebase = require("../utils/firebase");
const multer = require("multer");
const { error } = require("console");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const { roles, state_activity, state } = require("../constants");
const { url } = require("inspector");

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
    (this.idOrganization = idOrganization), (this.name = name);
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
  const activities = await activityModel.getAll(
    (withOrganization = true),
    (organization = req.session.organization)
  );

  res.render("activity/list", {
    announc: req.flash("success"),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activities,
  });
};

activityController.getView = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;
    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      req.flash("announc", "Hoạt động không tồn tại");
      res.redirect("/activity/list");
      return;
    }

    // user is student
    if (userss == null || userss.role == roles.STUDENT) {
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
      if (userss != null && userss.role == roles.STUDENT) {
        registered = await activityModel.isRegistered(activity_id, userss.id);
      }

      return res.render("activity/viewSV", {
        userss: userss,
        activity: activity,
        allowRegister: allowRegister,
        registered: registered,
        announc: req.flash("announc"),
      });
    }
    // User is organization
    else if (userss.role == roles.ORGANIZATION) {
      var isOwn = false;
      var allow_update = false;
      const now = new Date();
      var state_activity = "";
      var stateact;
      if (activity.organization_id == userss.id) {
        isOwn = true;
        stateact = activity.Confirm.toString();
        state_activity = state[stateact];
      }
      if (now < activity.registration_end_date && isOwn) {
        allow_update = true;
      }
      console.log(req.flash("announc"));
      return res.render("activity/viewNTC", {
        userss: userss,
        activity: activity,
        allowRegister: null,
        registered: null,
        isOwn: isOwn,
        allow_update: allow_update,
        state: state_activity,
        stateact: stateact,
        announc: req.flash("announc"),
      });
    } else if (userss.role == roles.ADMIN) {
      return res.redirect(`/admin/activity/${activity_id}/view`);
    }
  } catch (err) {
    console.log(err);
    req.flash("announc", "Loi xem hoat dong");
    res.redirect("/");
  }
};

activityController.registration = async (req, res) => {
  const userss = req.session.user;
  const activity_id = req.params.activity_id;

  const activities = await activityModel.GetById(activity_id);
  const list = await activityModel.GetListRegistationOfActivity(activity_id);
  res.render("activity/listmember", {
    activity: activities,
    listmember: list,
    userss: userss,
    announc: req.flash("announc"),
  });
};

activityController.Get_AddActivity = async (req, res) => {
  const userss = req.session.user;
  if (!userss) {
    return res.redirect("/auth/login");
  }
  if (!userss || userss.role == "student") {
    req.flash("announc", "Bạn không được phép truy cập trang hoạt động");
    return res.redirect("/");
  }
  res.render("activity/createpost", {
    error: req.flash("announc"),
    userss: userss,
    announc: req.flash("cannounc"),
  });
};

activityController.DownloadExcel = async (req, res) => {
  const activity_id = req.params.activity_id;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Members");
  worksheet.columns = [
    { header: "Ho van ten", key: "username", width: 30 },
    { header: "Ma SV", key: "masv", width: 15 },
    { header: "Khoa", key: "faculty", width: 35 },
    { header: "Lop", key: "class", width: 15 },
    { header: "Email", key: "email", width: 30 },
    { header: "So dien thoai", key: "phone_number", width: 20 },
    { header: "Xac nhan", key: "isComfirm", width: 10 },
    { header: "Diem danh", key: "isAttendance", width: 10 },
  ];
  const members = await activityModel.GetListRegistationOfActivity(activity_id);

  const transformedMembers = members.map((member) => ({
    ...member,
    isComfirm: member.isComfirm ? "Yes" : "No",
    isAttendance: member.isAttendance ? "Yes" : "No",
    ...member,
  }));

  transformedMembers.forEach((member) => {
    worksheet.addRow(member);
  });
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=members.xlsx");
  workbook.xlsx
    .write(res)
    .then(() => {
      res.end();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

activityController.add = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss || req.session.user.role == roles.STUDENT) {
      req.flash("announc", "Bạn không được phép tạo hoạt động");
      return res.redirect("/");
    }
    const {
      name,
      desc,
      date_start,
      date_end,
      date_start_regis,
      date_end_regis,
      location,
      number,
    } = req.body;

    if (
      !name ||
      !desc ||
      !date_start ||
      !date_end ||
      !date_start_regis ||
      !date_end_regis ||
      !location
    ) {
      throw new Error("Vui lòng nhập đủ các trường");
    }
    const now = new Date();
    const startRegisterDate = new Date(date_start_regis);
    const endRegisterDate = new Date(date_end_regis);
    const startDate = new Date(date_start);
    const endDate = new Date(date_end);

    function resetTime(date) {
      date.setHours(0, 0, 0, 0);
      return date;
    }

    resetTime(now);
    resetTime(startRegisterDate);
    resetTime(endRegisterDate);
    resetTime(startDate);
    resetTime(endDate);
    if (
      now < startRegisterDate &&
      startRegisterDate < endRegisterDate &&
      endRegisterDate < startDate &&
      startDate <= endDate
    ) {
      const firebaseStore = getStorage();
      const currentTimestamp = Date.now();
      const StoreRef = ref(
        firebaseStore,
        `poster/${req.file.originalname} ${currentTimestamp}`
      );
      const metadata = {
        contentType: req.file.mimetype,
      };
      const snapshot = await uploadBytesResumable(
        StoreRef,
        req.file.buffer,
        metadata
      );
      const url = await getDownloadURL(snapshot.ref);
      if (url) {
        const activity = await activityModel.add({
          name: req.body.name,
          organization_id: userss.id,
          description: req.body.desc.replace(/\n/g, "<br>"),
          start_date: req.body.date_start,
          end_date: req.body.date_end,
          registration_start_date: req.body.date_start_regis,
          registration_end_date: req.body.date_end_regis,
          location: req.body.location,
          number: number,
          image: url,
        });
        if (!activity) {
          throw new Error("Có lỗi xảy ra khi thêm hoạt động");
        }
      } else {
        throw new Error("fail firebase");
      }

      req.flash(
        "announc",
        `Bạn đã đăng ký thành công hoạt động ${req.body.name}`
      );
      return res.redirect("/");
    } else {
      throw Error("Nhập ngày phù hợp ");
    }
  } catch (error) {
    console.log(error);
    req.flash("announc", error.message);
    res.redirect("/activity/create");
  }
};
activityController.getEdit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss) {
      return res.redirect("/auth/login");
    }

    if (userss.role != roles.ORGANIZATION) {
      return res.redirect("/");
    }

    const activity_id = req.params.activity_id;
    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      req.flash("announc", "hoat dong khong ton tai hoac da bi xoa");
      return res.redirect("/");
    }

    if (activity.organization_id != userss.id) {
      req.flash("announc", "Ban khong phai nha to chuc cua hoat dong nay");
      return res.redirect(`/activity/${activity_id}/view`);
    }

    const now = new Date();
    if (now > Date(activity.start_date)) {
      req.flash("announc", "Hoat dong da het thoi han sua");
      return res.redirect(`/activity/${activity_id}/view`);
    }

    activity.end_date = new Date(activity.end_date).toISOString().split("T")[0];
    activity.start_date = new Date(activity.start_date)
      .toISOString()
      .split("T")[0];
    activity.registration_start_date = new Date(
      activity.registration_start_date
    )
      .toISOString()
      .split("T")[0];
    activity.registration_end_date = new Date(activity.registration_end_date)
      .toISOString()
      .split("T")[0];

    res.render("activity/editpost", {
      activity: activity,
      error: req.flash("announc"),
      userss: userss,
    });
  } catch (err) {
    req.flash("announc", err.message);
    res.redirect("/");
  }
};

activityController.post_edit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss) {
      return res.redirect("/auth/login");
    }
    console.log("a");
    if (userss.role != roles.ORGANIZATION) {
      return res.redirect("/");
    }
    console.log("b");

    const activity_id = req.params.activity_id;
    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      req.flash("announc", "hoat dong khong ton tai hoac da bi xoa");
      return res.redirect("/");
    }
    console.log("c");

    if (activity.organization_id != userss.id) {
      req.flash("announc", "Ban khong phai nha to chuc cua hoat dong nay");
      return res.redirect(`/activity/${activity_id}/view`);
    }

    var url;
    // Kiểm tra nếu có tệp mới được tải lên
    if (req.file) {
      const firebaseStore = getStorage();
      const currentTimestamp = Date.now();
      const StoreRef = ref(
        firebaseStore,
        `poster/${req.file.originalname} ${currentTimestamp}`
      );
      console.log(req.file);
      const metadata = {
        contentType: req.file.mimetype,
      };
      const snapshot = await uploadBytesResumable(
        StoreRef,
        req.file.buffer,
        metadata
      );
      url = await getDownloadURL(snapshot.ref);
    }
    const {
      name,
      desc,
      date_start,
      date_end,
      date_start_regis,
      date_end_regis,
      location,
    } = req.body;
    if (
      !name ||
      !desc ||
      !date_start ||
      !date_end ||
      !date_start_regis ||
      !date_end_regis ||
      !location
    ) {
      throw Error("Vui long nhap du thong tin");
    }
    // if (activity.name == name
    //   && activity.description == desc
    //   && activity.date_start == date_start
    //   && activity.date_end == date_end
    //   && activity.date_start_regis == date_start_regis
    //   && activity.date_end_regis == date_end_regis
    //   && activity.location == location) {
    //     req.flash('announc', 'Thong tin hoat dong khong thay doi');
    //     res.redirect(`/activity/${req.params.activity_id}/edit`);
    // }

    if (activity.Confirm != "yet") {
      const backup_acticity = {
        activity_id: activity.id,
        name: activity.name,
        description: activity.description,
        start_date: activity.start_date,
        end_date: activity.end_date,
        registration_start_date: activity.registration_start_date,
        registration_end_date: activity.registration_end_date,
        location: activity.location,
        number: activity.maxnumber,
        image: activity.image,
        confirm: activity.Confirm,
      };

      const result_backup = await activityModel.backup(backup_acticity);

      if (!result_backup) {
        throw Error("Loi backup");
      }
    }

    const updatedActivity = {
      name: name,
      description: desc,
      start_date: date_start,
      end_date: date_end,
      registration_start_date: date_start_regis,
      registration_end_date: date_end_regis,
      location: location,
      image: url,
    };

    const result = await activityModel.update(activity_id, updatedActivity);
    if (activity.Confirm == "yet") {
      await activityModel.ChangeState("yet", activity_id);
    }
    if (!result) {
      throw Error("loi khi sua hoat dong");
    }

    req.flash("annouc", "Chinh sua thong tin hoat dong thanh cong");
    return res.redirect(`/activity/${activity_id}/view`);
  } catch (err) {
    console.log(err);
    req.flash("announc", err.message);
    res.redirect(`/activity/${req.params.activity_id}/edit`);
  }
};

activityController.verify = async (req, res) => {
  try {
    const activity = await activityModel.GetById(req.params.activity_id);

    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    const updatedActivity = await activityModel.verify(
      req.params.activity_id,
      req.session.admin.id
    );

    if (!updatedActivity) {
      throw new Error("Có lỗi xảy ra khi xác thực hoạt động");
    }

    req.flash("success", `Đã duyệt hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash("error", error.message);
  }

  res.redirect("/activity/list");
};

activityController.unverify = async (req, res) => {
  try {
    const activity = await activityModel.GetById(req.params.activity_id);

    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    const updatedActivity = await activityModel.unverify(
      req.params.activity_id
    );

    if (!updatedActivity) {
      throw new Error("Có lỗi xảy ra khi bỏ xác thực hoạt động");
    }

    req.flash("success", `Đã bỏ duyệt hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash("error", error.message);
  }

  res.redirect("/activity/list");
};

activityController.Get_register = async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    const userss = req.session.user;

    if (!userss) {
      return res.redirect("/auth/login");
    }

    if (userss.role != roles.STUDENT) {
      req.flash("announc", "Ban khong duoc phep dang ky tham gia hoat dong");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      req.flash("announc", "Hoạt động không tồn tại");
      res.redirect("/");
    }

    const now = new Date();

    if (
      now < new Date(activity.registration_start_date) ||
      now > new Date(activity.registration_end_date)
    ) {
      req.flash("announc", "Hoat dong dang khong trong thoi han dang ky");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const isRegistered = await activityModel.isRegistered(
      req.params.activity_id,
      req.session.userid
    );

    if (isRegistered) {
      req.flash("announc", "Ban da dang ky hoat dong nay");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const student = await studentModel.GetProfileById(req.session.user.id);
    return res.render("activity/register", {
      error: req.flash("announc"),
      student: student,
      userss: userss,
      activity: activity,
    });
  } catch (error) {
    console.log(error);
    req.flash("announc", error.message);
    res.redirect(`/activity/${req.params.activity_id}/view`);
  }
};

activityController.Post_register = async (req, res) => {
  try {
    const activity_id = req.params.activity_id;
    const userss = req.session.user;

    if (!userss) {
      return res.redirect("/auth/login");
    }

    if (userss.role != roles.STUDENT) {
      req.flash("announc", "Ban khong duoc phep dang ky tham gia hoat dong");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      throw new Error("Hoat dong da bi xoa");
    }

    const now = new Date();

    if (
      now < new Date(activity.registration_start_date) ||
      now > new Date(activity.registration_end_date)
    ) {
      throw new Error("Đã hết thời gian đăng ký hoạt động");
    }

    const isRegistered = await activityModel.isRegistered(
      activity_id,
      userss.id
    );

    if (isRegistered) {
      throw new Error("Ban da dang ky hoat dong nay");
    }
    const { email, phone_number, wish } = req.body;
    if (!email || !phone_number) {
      throw new Error("Vui long nhap day du thong tin email va so dien thoai");
    }

    await studentModel.updateContactInfo(userss.id, email, phone_number);
  }

    const result = await activityModel.register(
      activity_id,
      userss.id,
      email,
      phone_number,
      wish
    );

    if (!result) {
      throw new Error("Có lỗi xảy ra khi đăng ký hoạt động");
    }

    req.flash(
      "announc",
      `Ban da dang ky tham gia hoat dong ${activity.name} thành công`
    );
    return res.redirect(`/activity/${activity_id}/view`);
  } catch (error) {
    req.flash("announc", error.message);
    const student = await studentModel.getSvRegister(req.session.user.id);
    return res.render("activity/register", {
      error: error,
      student: student,
    });
  }
};

activityController.unregister = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;
    if (!userss) {
      return res.redirect("/auth/login");
    }

    if (userss.role != roles.STUDENT) {
      req.flash("announc", "Ban khong duoc phep dang ky tham gia hoat dong");
      res.redirect(`/activity/${activity_id}/view`);
    }

    const activity = await activityModel.GetById(req.params.activity_id);

    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    const now = new Date();
    if (
      now < new Date(activity.registration_start_date) ||
      now > new Date(activity.registration_end_date)
    ) {
      throw new Error("Đã hết thời gian hủy đăng ký hoạt động");
    }

    var isRegistered = await activityModel.isRegistered(activity_id, userss.id);

    if (!isRegistered) {
      throw new Error("Bạn không thể hủy đăng ký khi chưa đăng ký");
    }

    const result = await activityModel.unregister(activity_id, userss.id);

    if (!result) {
      throw new Error("Có lỗi xảy ra khi hủy đăng ký hoạt động");
    }

    req.flash("announc", `Hủy đăng ký hoạt động ${activity.name} thành công`);
  } catch (error) {
    req.flash("announc", error.message);
    console.log(error);
  }

  res.redirect(`/activity/${req.params.activity_id}/view`);
};

activityController.ConfirmRegisterSV = async (req, res) => {
  const { activity_id, student_id, is_confirmed } = req.query;
  const change = await activityModel.ChangeConfirmRegister(
    activity_id,
    student_id,
    is_confirmed
  );

  if (change) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(400).json({ message: "fail" });
  }
};

activityController.search = async (req, res) => {
  const activities = await activityModel.search(req.query.q);

  res.render("homeole", {
    userss: req.session.user,
    activities,
    datetimeUtils,
    pathUtils,
  });
};

activityController.qrcode_attendance = async (req, res) => {
  const activity = await activityModel.GetById(req.params.activity_id);

  if (!activity) {
    req.flash("error", "Hoạt động không tồn tại");
    res.redirect("/activity/list");
    return;
  }

  const qrcodeContent = `${public_domain}/activity/${req.params.activity_id}/attendance`;
  const filePath = `public/qrcodes/${req.params.activity_id}.png`;

  if (!fs.existsSync("public/qrcodes")) {
    fs.mkdirSync("public/qrcodes", { recursive: true });
  }

  await qrcode.toFile(filePath, qrcodeContent);

  res.render("activity/qrcode_attendance", {
    success: req.flash("success"),
    error: req.flash("error"),
    userss: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activity,
    filePath,
    pathUtils,
  });
};

activityController.attendance = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    const activity = await activityModel.GetById(req.params.activity_id);

    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    const now = new Date();

    if (
      now < new Date(activity.start_date) ||
      now > new Date(activity.end_date)
    ) {
      throw new Error("Đã hết thời gian điểm danh");
    }

    console.log(req.params.activity_id, "    ", req.session.user.id);
    const result = await registrationModel.attendent(
      req.params.activity_id,
      req.session.user.id
    );

    if (!result) {
      throw new Error("Có lỗi xảy ra khi điểm danh");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", error.message);
    res.redirect(`/activity/${req.params.activity_id}/view`);
  }
  res.redirect(`/activity/${req.params.activity_id}/view`);
};

activityController.my_activity = async (req, res) => {
  const activities = await activityModel.getStudentActivities(
    req.session.student.id
  );

  res.render("activity/my_activity", {
    success: req.flash("success"),
    error: req.flash("error"),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    activities,
  });
};

activityController.delete = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;

    if (!userss) {
      return res.redirect("/auth/login");
    }

    if (userss.role != roles.ADMIN && userss.id != activity_id) {
      throw new Error("Ban khong duoc phep xoa hoat dong nay");
    }

    const activity = await activityModel.GetById(activity_id);
    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    if (userss.role != roles.ADMIN && userss.id != activity.organization_id) {
      throw Error("Ban khong duoc phep xoa hoat dong nay");
    }

    const result = await activityModel.delete(activity_id);

    if (!result) {
      throw new Error("Có lỗi xảy ra khi xóa hoạt động");
    }

    req.flash("announc", `Xóa hoạt động ${activity.name} thành công`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("announc", error.message);
    res.redirect("/");
  }
};

activityController.confirm = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;

    if (!userss) {
      return res.redirect("/auth/login");
    }

    const activity = await activityModel.GetById(activity_id);
    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    if (userss.id != activity.organization_id) {
      throw Error("Ban khong phai nha to chuc hoat dong nay");
    }

    const result = await activityModel.ChangeState("done", activity_id);

    if (!result) {
      throw new Error("Có lỗi xảy ra khi xóa hoạt động");
    }

    req.flash("announc", `Hoat dong ${activity.name} da duoc cong khai`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("announc", error.message);
    res.redirect("/");
  }
};

activityController.saveActivity = async (req, res) => {
  try {
    const userss = req.session.user;

    if (!userss) {
      res.redirect("/auth/login");
    }
    const activity_id = req.params.activity_id;

    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      throw new Error("Hoạt động không tồn tại");
    }

    const isSaved = await activityModel.isSaved(activity_id, userss.id);

    if (isSaved.length > 0) {
      return res.status(400).json({ message: "Bạn đã lưu hoạt động này rồi" });
    }
    const result = await activityModel.save(userss.id, activity_id);
    if (!result) {
      throw new Error("Có lỗi xảy ra khi lưu hoạt động");
    }

    return res
      .status(200)
      .json({ message: `Hoạt động ${activity.name} đã được lưu` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

activityController.send_email = async (req, res) => {
  const activity_id = req.params.activity_id;
  const { senderType, subject, content } = req.body;
  const attachments = [];

  if (req.files["attachment"]) {
    attachments.push({
      filename: req.files["attachment"][0].originalname,
      path: req.files["attachment"][0].path,
    });
  }

  if (req.files["imageAttachment"]) {
    attachments.push({
      filename: req.files["imageAttachment"][0].originalname,
      path: req.files["imageAttachment"][0].path,
    });
  }

  var recipientEmails;
  if (senderType == "confirm") {
    recipientEmails = await activityModel.Get_EmailByACtConfirm(activity_id);
  } else {
    recipientEmails = await activityModel.Get_EmailByACtAttendance(activity_id);
  }

  const emailList = recipientEmails.map((recipient) => recipient.email);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "phanduclam02@gmail.com",
      pass: "qoqh nvvq wvlm rzin",
    },
  });

  let mailOptions = {
    from: "BK Volunteer",
    to: emailList.join(","),
    subject: subject,
    text: content,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent successfully");
    }
  });
};
