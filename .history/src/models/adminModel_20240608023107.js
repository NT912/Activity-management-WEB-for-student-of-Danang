const pool = require("../database");
const activityModel = require("./activityModel");

const adminModel = module.exports;

adminModel.getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM administrators WHERE id = ?", [
    id,
  ]);
  return rows[0] || null;
};

adminModel.getByUserId = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM administrators WHERE user_id = ?",
    [user_id]
  );
  return rows[0] || null;
};

adminModel.GetAvtByEmail = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT avt FROM administrators WHERE email = ?",
    [user_id]
  );
  return rows[0].avt || null;
};

adminModel.create = async (admin) => {
  const [result] = await pool.query(
    "INSERT INTO administrators (user_id, email, phone) VALUES (?, ?, ?)",
    [admin.user_id, admin.email, admin.phone]
  );

  if (result.insertId) {
    return await adminModel.getById(result.insertId);
  }

  return null;
};

adminModel.update = async (admin_id, admin) => {
  const queryText = `
      UPDATE administrators
      SET fullname = ?, email = ?, phone = ?
      WHERE id = ?
    `;

  const [result] = await pool.query(queryText, [
    admin.fullname,
    admin.email,
    admin.phone,
    admin.id,
  ]);

  if (result.affectedRows) {
    return await adminModel.getById(admin_id);
  }

  return null;
};

// Các xử lý ở trang profile
userModel.getCountByRole = async (role) => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS count FROM users WHERE role = ?",
    [role]
  );
  return rows[0].count;
};

activityModel.getUnapprovedPostsCount = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS unapprovedCount FROM activities WHERE Confirm != ?",
      ["done"]
    );
    return rows[0].unapprovedCount || 0;
  } catch (error) {
    console.error("Error getting unapproved posts count:", error);
    throw error;
  }
};

adminModel.getUpcomingPostsCount = async () => {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS upcomingCount FROM activities WHERE Confirm = ? AND start_date > ?",
      ["done", currentDate]
    );
    return rows[0].upcomingCount || 0;
  } catch (error) {
    console.error("Error getting upcoming posts count:", error);
    throw error;
  }
};

adminModel.getUpcomingPostsCount = async () => {
  try {
    // Lấy ngày hiện tại
    const currentDate = new Date().toISOString().split("T")[0];

    // Truy vấn SQL để đếm số lượng bài viết sắp diễn ra
    const [rows] = await pool.query(
      'SELECT COUNT(*) AS count FROM activities WHERE start_date > ? AND confirm = "done"',
      [currentDate]
    );

    // Trả về số lượng bài viết sắp diễn ra
    return rows[0].count;
  } catch (error) {
    console.error("Error in getting upcoming posts count:", error);
    throw error;
  }
};
