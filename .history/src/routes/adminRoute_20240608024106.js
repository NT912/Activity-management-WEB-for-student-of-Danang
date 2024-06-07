const router = require("express").Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const { static_paths } = require("../constants");
const controller = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth");
const { route } = require("./authRoute");

router.get("/", authMiddleware.isAdmin, controller.Get_Home);

router.get(
  "/activity/:activity_id/view",
  authMiddleware.isAdmin,
  controller.get_ViewActivity
);

router.post(
  "/activity/:activity_id/confirm",
  authMiddleware.isAdmin,
  controller.post_ConfirmActivity
);
router.post(
  "/activity/:activity_id/reject",
  authMiddleware.isAdmin,
  controller.post_RejectActivity
);

router.get("/:user_id/edit", authMiddleware.isAdmin, controller.Get_EditUser);
router.post(
  "/:user_id/edit",
  authMiddleware.isAdmin,
  controller.Post_editacaount
);

router.get("/profile", controller.Get_Profile);

// Các xử lý ở trang profile
router.get(
  "/api/student-count",
  authMiddleware.isAdmin,
  controller.getStudentCount
);

router.get(
  "/api/unapproved-posts-count",
  authMiddleware.isAdmin,
  controller.getUnapprovedPostsCount
);

router.get(
  "/api/upcoming-activities-count",
  controller.getUpcomingActivitiesCount
);

router.get(
  "/api/organization-count",
  authMiddleware.isAdmin,
  adminController.getOrganizationCount
);

// router.get('/list', authMiddleware.isOrganizationOrAdmin, controller.getList);
// router.get('/:activity_id/view', controller.getView);

// router.get('/create', controller.Get_AddActivity);
// router.post('/create', upload.single('poster'), controller.add);
// // router.post('/create', authMiddleware.isOrganizationOrAdmin, upload.single('image'), controller.add);

// router.get('/:activity_id/edit', controller.getEdit);
// // router.post('/:activity_id/edit', controller.edit);
// router.post('/:activity_id/edit',  upload.single('poster'), controller.post_edit);

// router.get('/:activity_id/verify', authMiddleware.isAdmin, controller.verify);
// router.get('/:activity_id/unverify', authMiddleware.isAdmin, controller.unverify);

// router.get('/:activity_id/register',  controller.Get_register);
// router.post('/:activity_id/register',  controller.Post_register);

// router.get('/:activity_id/unregister', controller.unregister);

// router.get('/:activity_id/registration/', controller.registration);
// router.get('/:activity_id/download-excel/', controller.DownloadExcel);

// router.post('/confirmStudentRegister', controller.ConfirmRegisterSV);
// // router.get('/:activity_id/unregister', authMiddleware.isStudent, controller.unregister);

// router.get('/search', controller.search);
// router.get('/my_activity', authMiddleware.isStudent, controller.my_activity);

// router.get('/:activity_id/qrcode_attendance', authMiddleware.isOrganization, controller.qrcode_attendance);
// router.get('/:activity_id/attendance', authMiddleware.isStudent, controller.attendance);

// router.get('/:activity_id/delete', controller.delete);

module.exports = router;
