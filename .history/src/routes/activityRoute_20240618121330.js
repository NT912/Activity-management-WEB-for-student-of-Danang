const router = require("express").Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const { static_paths } = require("../constants");
const controller = require("../controllers/activityController");
const authMiddleware = require("../middlewares/auth");

router.get("/list", authMiddleware.isOrganizationOrAdmin, controller.getList);
router.get("/:activity_id/view", controller.getView);

router.get("/create", controller.Get_AddActivity);
router.post("/create", upload.single("poster"), controller.add);
// router.post('/create', authMiddleware.isOrganizationOrAdmin, upload.single('image'), controller.add);

router.get("/:activity_id/edit", controller.getEdit);
// router.post('/:activity_id/edit', controller.edit);
router.post(
  "/:activity_id/edit",
  upload.single("poster"),
  controller.post_edit
);

router.get("/:activity_id/verify", authMiddleware.isAdmin, controller.verify);
router.get(
  "/:activity_id/unverify",
  authMiddleware.isAdmin,
  controller.unverify
);

// router.get("/:activity_id/register", controller.Get_register);
// router.post("/:activity_id/register", controller.Post_register);

// router.get("/:activity_id/unregister", controller.unregister);

router.get("/:activity_id/registration/", controller.registration);
router.get("/:activity_id/download-excel/", controller.DownloadExcel);

router.post("/confirmStudentRegister", controller.ConfirmRegisterSV);

router.post("/:activity_id/save", controller.saveActivity);

router.get("/search", controller.search);
router.get("/my_activity", authMiddleware.isStudent, controller.my_activity);

router.get(
  "/:activity_id/qrcode_attendance",
  authMiddleware.isOrganization,
  controller.qrcode_attendance
);

router.get(
  "/:activity_id/attendance",
  authMiddleware.isStudent,
  controller.attendance
);

router.get("/:activity_id/delete", controller.delete);

router.get("/:activity_id/confirm", controller.confirm);

router.post(
  "/:activity_id/sendemail",
  upload.fields([{ name: "attachment" }, { name: "imageAttachment" }]),
  controller.send_email
);

module.exports = router;
