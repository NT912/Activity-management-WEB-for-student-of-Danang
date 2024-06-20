const facultyModel = require("../models/facultyModel");
const userModel = require("../models/userModel");
const studentModel = require("../models/studentModel");
const acitivityModel = require("../models/activityModel");
const organizationModel = require("../models/organizationModel");
const adminModel = require("../models/adminModel");
const registrationModel = require("../models/registrationModel");
const attendanceModel = require("../models/attendanceModel");
const { roles } = require("../constants");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const md5 = require("md5");

const userController = module.exports;

userController.getList = async (req, res) => {
  const student_users = await userModel.getByRole(roles.STUDENT);
  const organization_users = await userModel.getByRole(roles.ORGANIZATION);

  res.render("user/list", {
    success: req.flash("success"),
    error: req.flash("error"),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
    student_users,
    organization_users,
  });
};

userController.getAdd = async (req, res) => {
  res.render("user/add", {
    success: req.flash("success"),
    error: req.flash("error"),
    user: req.session.user,
    student: req.session.student,
    admin: req.session.admin,
    organization: req.session.organization,
  });
};

userController.addStudent = async (req, res) => {
  try {
    const _user = await userModel.getByUsername(req.body.username);

    if (_user) {
      throw new Error("Tài khoản đã tồn tại");
    }

    const _student = await studentModel.getById(req.body.student_id);

    if (_student) {
      throw new Error("Sinh viên đã tồn tại");
    }

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.STUDENT,
    });

    const student = await studentModel.create({
      id: req.body.student_id,
      user_id: user.id,
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      faculty: req.body.faculty,
      class: req.body.class,
    });

    req.flash(
      "success",
      `Sinh viên ${student.fullname} | ${student.id} đã được thêm`
    );

    res.redirect("/user/list");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/user/add");
  }
};

userController.addOrganization = async (req, res) => {
  try {
    const _user = await userModel.getByUsername(req.body.username);

    if (_user) {
      throw new Error("Tài khoản đã tồn tại");
    }

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
      role: roles.ORGANIZATION,
    });

    const organization = await organizationModel.create({
      user_id: user.id,
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });

    req.flash("success", `Tổ chức ${organization.name} đã được thêm`);

    res.redirect("/user/list");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/user/add");
  }
};

userController.Get_Profile = async (req, res) => {
  const userss = req.session.user;
  if (!userss) {
    return res.redirect("/auth/login");
  }

  if (userss.role == roles.STUDENT) {
    try {
      const user = await studentModel.GetProfileById(userss.id);
      var activities;
      var active;
      if (req.query.mod) {
        const mod = req.query.mod;
        if (mod == "joined") {
          active = "joined";
          activities = await acitivityModel.GetActSVJoined(userss.id);
        } else if (mod == "saved") {
          active = "saved";
          activities = await acitivityModel.GetActSave(userss.id);
        } else {
          return res.redirect("/user/profile");
        }
      } else {
        active = "registered";
        activities = await acitivityModel.GetActSVRegistered(userss.id);
      }
      res.render("user/profileStudent", {
        User: user,
        activities: activities,
        active: active,
        userss: userss,
        announc: req.flash("announc"),
      });
    } catch (err) {
      console.log(err);
      req.flash("announc", err.message);
      return res.redirect("/");
    }
  } else if (userss.role == roles.ORGANIZATION) {
    try {
      const user = await organizationModel.GetProfileById(userss.id);
      // const activities = await acitivityModel.GetActSVRegistered(userss.id);
      var activities;
      var active;
      if (req.query.mod) {
        const mod = req.query.mod;
        console.log(mod);
        if (mod == "wait") {
          active = "wait";
          activities = await acitivityModel.GetActNTCWait(userss.id);
        } else if (mod == "process") {
          active = "process";
          activities = await acitivityModel.GetActNTCProcess(userss.id);
        } else if (mod == "saved") {
          active = "saved";
          activities = await acitivityModel.GetActSave(userss.id);
        } else {
          return res.redirect("/user/profile");
        }
      } else {
        active = "done";
        activities = await acitivityModel.GetActNTCDone(userss.id);
      }
      res.render("user/profileNTC", {
        User: user,
        activities: activities,
        active: active,
        userss: userss,
        announc: req.flash("announc"),
      });
    } catch (err) {
      console.log(err);
      req.flash("announc", err.message);
      return res.redirect("/");
    }
  }
};

userController.Get_ViewUser = async (req, res) => {
  const userss = req.session.user;
  const user_id = req.params.user_id;
  console.log("   ", user_id);

  const user = await userModel.getById(user_id);
  console.log(user);
  if (user.role == roles.STUDENT) {
    try {
      const userInf = await studentModel.GetProfileById(user_id);
      const mod = req.query.mod;
      if (mod == "joined") {
        active = "joined";
        activities = await acitivityModel.GetActSVJoined(user_id);
      } else {
        active = "registered";
        activities = await acitivityModel.GetActSVRegistered(user_id);
      }

      res.render("user/viewSV", {
        User: userInf,
        activities: activities,
        active: active,
        userss: userss,
        announc: req.flash("announc"),
      });
    } catch (err) {
      console.log(err);
      req.flash("announc", err.message);
      return res.redirect("/");
    }
  } else if (user.role == roles.ORGANIZATION) {
    try {
      const user = await organizationModel.GetProfileById(user_id);

      var activities;
      var active;
      if (req.query.mod) {
        const mod = req.query.mod;
        console.log(mod);
        if (mod == "wait") {
          active = "wait";
          activities = await acitivityModel.GetActNTCWait(userss.id);
        } else if (mod == "process") {
          active = "process";
          activities = await acitivityModel.GetActNTCProcess(userss.id);
        } else {
          return res.redirect("/user/profile");
        }
      } else {
        active = "done";
        activities = await acitivityModel.GetActNTCDone(userss.id);
      }
      res.render("user/viewNTC", {
        User: user,
        activities: activities,
        active: active,
        userss: userss,
        announc: req.flash("announc"),
      });
    } catch (err) {
      console.log(err);
      req.flash("announc", err.message);
      return res.redirect("/");
    }
  }
};

userController.Get_Edit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss) {
      return res.redirect("/auth/login");
    }

    const user_id = req.params.user_id;
    if (user_id && userss.role == roles.ADMIN) {
      const user = await userModel.getById(user_id);
      if (user.role == roles.STUDENT) {
        const user = await studentModel.GetProfileById(user_id);
        faculty = await facultyModel.getAllFaculty();
        return res.render("user/editUserAdmin", {
          userss: userss,
          user: user,
          error: req.flash("error"),
          faculties: faculty,
        });
      } else if (user.role == roles.ORGANIZATION) {
        const user = await organizationModel.GetProfileById(user_id);
        return res.render("user/edit", {
          userss: userss,
          error: "",
          user: user,
        });
      }
    }

    if (userss.role === roles.STUDENT) {
      const user = await studentModel.GetProfileById(userss.id);
      faculty = await facultyModel.getAllFaculty();
      return res.render("user/edit", {
        userss: userss,
        user: user,
        error: req.flash("error"),
        faculties: faculty,
      });
    } else if (userss.role === roles.ORGANIZATION) {
      const user = await organizationModel.GetProfileById(userss.id);
      return res.render("user/edit", {
        userss: userss,
        error: "",
        user: user,
      });
    }
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error", error.message);
    res.redirect("/user/profile");
  }
};

userController.Post_Edit = async (req, res) => {
  try {
    const userss = req.session.user;
    if (!userss) {
      return res.redirect("/");
    }

    if (userss.role === roles.STUDENT) {
      const _student = await studentModel.getByUserId(userss.id);

      if (!_student) {
        throw new Error(`Tài khoản không tồn tại`);
      }

      const { username, masv, faculty, classs, email, phone } = req.body;
      if (!username || !masv || !faculty || !classs || !email || !phone) {
        throw new Error(`Vui lòng nhập đầy đủ thông tin`);
      }

      const student_msv = await studentModel.getByMasv(masv);
      if (student_msv && student_msv.user_id != userss.id) {
        throw new Error(`Mã sinh viên đã tồn tại`);
      }

      const student_email = await studentModel.getByEmail(email);
      if (student_email && student_email.user_id != userss.id) {
        throw new Error(`Email đã tồn tại`);
      }
      const student = await studentModel.update(userss.id, {
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
      res.redirect("/user/profile");
    } else if (userss.role === roles.ORGANIZATION) {
      const organization = await organizationModel.getByUserId(userss.id);

      if (!organization) {
        throw new Error(`Tài khoản đã bị xóa hoặc không tồn tại `);
      }

      const { username, email, address, phone, description } = req.body;
      if (!username || !email || !address || !phone || !description || !phone) {
        throw new Error(`Vui lòng nhập đầy đủ thông tin`);
      }

      const organization_email = await organizationModel.getByEmail(email);
      if (organization_email && organization_email.user_id != userss.id) {
        throw new Error(`Email đã tồn tại`);
      }

      const check = await organizationModel.update(userss.id, {
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
      res.redirect("/user/profile");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", error.message);
    res.redirect("/user/edit");
  }
};

userController.edit = async (req, res) => {
  try {
    // const _user = await userModel.getById(req.params.user_id);

    // if (!_user) {
    //   throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    // }

    const userss = req.session.user;
    if (!userss) {
      return res.redirect("/");
    }

    const user = await userModel.update(_user.id, {
      username: req.body.username,
      password: req.body.password,
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
        class: req.body.class,
      });

      await registrationModel.updateStudent(_student.id, student.id);
      await attendanceModel.updateStudent(_student.id, student.id);

      req.flash(
        "success",
        `Sinh viên ${student.fullname} | ${student.id} đã được cập nhật`
      );

      res.redirect("/user/list");
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
        address: req.body.address,
      });

      req.flash("success", `Tổ chức ${organization.name} đã được cập nhật`);

      res.redirect("/user/list");
    }
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/user/list");
  }
};

userController.Post_avt = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const userss = req.session.user;

    if (!userss) {
      throw Error("Bạn chưa đăng nhập");
    }

    const firebaseStore = getStorage();
    const currentTimestamp = Date.now();
    const StoreRef = ref(
      firebaseStore,
      `avt-user/${req.file.originalname} ${currentTimestamp}`
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

    var result = false;
    if (url) {
      req.session.user.avt = url;
      req.session.save();
      if (userss.role == roles.STUDENT) {
        result = await userModel.updateAvtSV(url, userss.id);
      } else if (userss.role == roles.ORGANIZATION) {
        result = await userModel.updateAvtNTC(url, userss.id);
      }
    } else {
      throw Error("lỗi tải ảnh lên firebase");
    }

    if (!result) {
      throw Error("lỗi tải ảnh lên databse");
    }

    return res.status(200).json({ newAvatarUrl: url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to upload avatar" });
  }
};

userController.delete = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await userModel.getById(user_id);

    if (!user) {
      throw new Error(`Tài khoản với ID ${req.params.user_id} không tồn tại`);
    }

    if (user.role == roles.STUDENT) {
      const student = await studentModel.getByUserId(user_id);

      if (!student) {
        throw new Error(`Sinh viên với ID ${req.params.user_id} không tồn tại`);
      }

      const result_dst = await studentModel.delete(user_id);
      const result_dus = await userModel.delete(user_id);
      console.log(result_dst, "   ", result_dus);
    } else if (user.role === roles.ORGANIZATION) {
      const organization = await organizationModel.getByUserId(user.id);

      if (!organization) {
        throw new Error(`Tổ chức với ID ${req.params.user_id} không tồn tại`);
      }

      await organizationModel.delete(organization.id);
    }

    await userModel.delete(user.id);

    req.flash("announc", `Tài khoản ${user.username} đã được xóa`);

    res.redirect("/admin/?mod=systems");
  } catch (error) {
    console.log(error);
    req.flash("announc", error.message);
    res.redirect("/admin/?mod=systems");
  }
};

userController.searchStudents = async (req, res) => {
  const searchQuery = req.query.q;
  console.log("gg");
  try {
    const students = await userModel.searchStudentsByName(searchQuery);
    res.json(students);
  } catch (error) {
    console.error("Error searching students:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm sinh viên." });
  }
};

userController.searchStudents = async (req, res) => {
  const searchQuery = req.query.q;
  console.log("gg");
  try {
    const students = await userModel.searchStudentsByName(searchQuery);
    res.json(students);
  } catch (error) {
    console.error("Error searching students:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm sinh viên." });
  }
};
