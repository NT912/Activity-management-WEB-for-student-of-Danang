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
  controller.getOrganizationCount
);


module.exports = router;
