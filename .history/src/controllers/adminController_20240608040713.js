const qrcode = require("qrcode");
const fs = require("fs");

const organizationModel = require("../models/organizationModel");
const ExcelJS = require("exceljs");
const facultyModel = require("../models/facultyModel");
const activityModel = require("../models/activityModel");
const datetimeUtils = require("../utils/datetime");
const pathUtils = require("../utils/path");
const { public_domain } = require("../config");
const firebase = require("../utils/firebase");
const multer = require("multer");
const { error } = require("console");
const bodyParser = require("body-parser");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const { roles, state_activity, state } = require("../constants");
const { url } = require("inspector");

const adminController = module.exports;

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

adminController.Get_Home = async (req, res) => {
  try {
    const mod = req.query.mod;
    let activities;
    var state = "";
    var student_users;
    var organization_users;
    var student_users_count;
    var organization_users_count;
    if (mod == "wait") {
      activities = await activityModel.GetAllWaitConfirm(0);
      state = "wait";
    } else if (mod == "systems") {
      student_users = await userModel.getByRole(roles.STUDENT);
      organization_users = await userModel.getByRole(roles.ORGANIZATION);
      state = "account";
    } else {
      activities = await activityModel.GetAll(0);
    }

    const userss = req.session.user;
    res.render("admin/home", {
      activities: activities,
      userss: userss,
      announc: req.flash("announc"),
      state: state,
      student_users,
      organization_users,
      student_users_count,
      organization_users_count,
    });
  } catch (err) {
    console.log(err);
  }
};

adminController.get_ViewActivity = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;
    console.log(activity_id);
    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      req.flash("announc", "Hoạt động không tồn tại");
      res.redirect("/admin/");
      return;
    }

    const stateact = activity.Confirm.toString();
    const state_activity = state[stateact];

    return res.render("admin/viewActivity", {
      userss: userss,
      activity: activity,
      stateact: stateact,
      state: state_activity,
      announc: req.flash("announc"),
    });
  } catch (err) {
    console.log(err);
    req.flash("announc", "Loi xem hoat dong");
    res.redirect("/");
  }
};

adminController.post_ConfirmActivity = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;
    const adminFeedback = req.body.adminFeedback;

    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      return res.status(404).json({ message: "Hoạt động không tồn tại" });
    }

    const stateact = activity.Confirm.toString();
    let result = false;

    console.log(stateact);
    if (stateact === "yet" || stateact === "reject" || stateact === "update") {
      result = await activityModel.ChangeState("confirm", activity_id);
    }

    if (!result) {
      throw new Error("Cập nhật trạng thái thất bại");
    }

    const commentResult = await activityModel.Changecomment(
      adminFeedback,
      activity_id
    );

    if (!commentResult) {
      throw new Error("Cập nhật phản hồi thất bại");
    }

    res.status(200).json({ message: "Duyệt hoạt động thành công" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

adminController.post_RejectActivity = async (req, res) => {
  try {
    const userss = req.session.user;
    const activity_id = req.params.activity_id;
    const adminFeedback = req.body.adminFeedback; // Lấy phản hồi của admin từ body của request

    const activity = await activityModel.GetById(activity_id);

    if (!activity) {
      req.flash("announc", "Hoạt động không tồn tại");
      res.redirect("/admin/");
      return;
    }

    const stateact = activity.Confirm.toString();
    let result = false;

    if (stateact == "yet") {
      result = await activityModel.ChangeState("reject", activity_id);
    } else if (stateact == "confirm") {
      result = await activityModel.ChangeState("reject", activity_id);
    } else if (stateact == "update") {
      const activity_backup = await activityModel.GetBackupActivity(
        activity_id
      );
      if (activity_backup) {
        result = await activityModel.update(activity_id, activity_backup);
        if (!result) {
          throw Error("Lỗi backup");
        }
      }
    }

    if (!result) {
      throw Error("Sai sai rồi");
    }

    // Cập nhật phản hồi của admin
    const commentResult = await activityModel.Changecomment(
      adminFeedback,
      activity_id
    );
    if (!commentResult) {
      throw new Error("Cập nhật phản hồi thất bại");
    }

    req.flash("announc", "Bạn đã từ chối hoạt động");
    res.redirect(`/admin/activity/${activity_id}/view`);
  } catch (err) {
    console.log(err);
    req.flash("announc", err.message);
    res.redirect(`/admin/activity/${req.params.activity_id}/view`);
  }
};

adminController.Get_EditUser = async (req, res) => {
  try {
    const userss = req.session.user;
    const user_id = req.params.user_id;

    const user = await userModel.getById(user_id);

    if (!user) {
      throw Error("tai khoan khong ton tai");
    }

    if (user.role == roles.STUDENT) {
      const user = await studentModel.GetProfileById(user_id);
      const faculty = await facultyModel.getAllFaculty();
      user.role = "student";
      console.log(user);
      return res.render("admin/editUser", {
        userss: userss,
        user: user,
        error: req.flash("error"),
        faculties: faculty,
      });
    } else if (user.role == roles.ORGANIZATION) {
      const user = await organizationModel.GetProfileById(user_id);
      user.role = "organization";
      return res.render("admin/editUser", {
        userss: userss,
        error: "",
        user: user,
      });
    }
    return res.redirect("/admin/?mod=account");
  } catch (error) {
    console.log(error);
    req.flash("error", error.message);
    res.redirect("/user/profile");
  }
};

adminController.Get_Profile = async (req, res) => {
  try {
    const userss = req.session.user;
    student_users = await userModel.getByRole(roles.STUDENT);
    organization_users = await userModel.getByRole(roles.ORGANIZATION);
    return res.render("admin/profile", {
      userss: userss,
      student_users,
      organization_users,
    });
  } catch (error) {
    console.log(error);
    req.flash("error", error.message);
    res.redirect("/user/profile");
  }
};
adminController.Post_editacaount = async (req, res) => {
  try {
    const userss = req.session.user;
    const user_id = req.params.user_id;
    const user = await userModel.getById(user_id);
    if (!user) {
      throw Error("tai khoan khong ton tai");
    }

    if (user.role == roles.STUDENT) {
      const { username, masv, faculty, classs, email, phone } = req.body;
      if (!username || !masv || !faculty || !classs || !email || !phone) {
        throw new Error(`Vui lòng nhập đầy đủ thông tin`);
      }

      const student_msv = await studentModel.getByMasv(masv);
      if (student_msv && student_msv.user_id != user.id) {
        throw new Error(`Mã sinh viên đã tồn tại`);
      }

      const student_email = await studentModel.getByEmail(email);
      if (student_email && student_email.user_id != user_id) {
        throw new Error(`Email đã tồn tại`);
      }
      const student = await studentModel.update(user_id, {
        name: username,
        email: email,
        phone: phone,
        faculty: faculty,
        classs: classs,
        masv: masv,
      });
      if (!student) {
        throw new Error(`Cập nhật thông tin không thành công`);
      }
      req.flash(
        "success",
        `Sinh viên ${student.fullname} | ${student.id} đã được cập nhật`
      );
      res.redirect(`/user/${user_id}/view`);
    } else if (user.role === roles.ORGANIZATION) {
      console.log("here");
      const organization = await organizationModel.getByUserId(user.id);

      if (!organization) {
        throw new Error(`Tài khoản đã bị xóa hoặc không tồn tại `);
      }

      const { username, email, address, phone, description } = req.body;

      if (!username || !email || !address || !phone || !description || !phone) {
        throw new Error(`Vui lòng nhập đầy đủ thông tin`);
      }

      const organization_email = await organizationModel.getByEmail(email);
      if (organization_email && organization_email.user_id != user_id) {
        throw new Error(`Email đã tồn tại`);
      }

      const check = await organizationModel.update(user_id, {
        name: username,
        description: description,
        email: email,
        phone: phone,
        address: address,
      });

      if (!check) {
        throw new Error(`Cập nhật thông tin không thành công`);
      }

      req.flash("success", `Tổ chức ${organization.name} đã được cập nhật`);
      res.redirect(`/user/${user_id}/view`);
    }
  } catch (error) {
    console.log(error);
    req.flash("error", error.message);
    res.redirect(`/admin/${req.params / user_id}/edit`);
  }
};

// Các xử lý ở trang profile
adminController.getStudentCount = async (req, res) => {
  try {
    const studentCount = await userModel.getCountByRole(roles.STUDENT);
    res.status(200).json({ count: studentCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi lấy số lượng sinh viên" });
  }
};

adminController.getUnapprovedPostsCount = async (req, res) => {
  try {
    const unapprovedCount = await activityModel.getUnapprovedPostsCount(); // Hàm này phải được triển khai trong model
    res.json({ count: unapprovedCount });
  } catch (error) {
    console.error("Error getting unapproved posts count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

adminController.getUpcomingActivitiesCount = async (req, res) => {
  try {
    const upcomingActivitiesCount =
      await activityModel.getUpcomingActivitiesCount();
    res.json({ count: upcomingActivitiesCount });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

adminController.getOrganizationCount = async (req, res) => {
  try {
    const organizationCount = await userModel.getCountByRole(
      roles.ORGANIZATION
    );
    res.status(200).json({ count: organizationCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi khi lấy số lượng sinh viên" });
  }
};
