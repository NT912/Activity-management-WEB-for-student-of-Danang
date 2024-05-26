const pool = require("../database");

studentModel = module.exports;

studentModel.getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id]);

  return rows[0] ? rows[0] : null;
}

studentModel.create = async (student) => {
  const [result] = await pool.query(
    "INSERT INTO students (id, fullname, user_id, faculty, class, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [student.id, student.fullname, student.user_id, student.faculty, student.class, student.email, student.phone]
  );

  if (result.insertId) {
    return await studentModel.getById(result.insertId);
  }

  return null;
}
