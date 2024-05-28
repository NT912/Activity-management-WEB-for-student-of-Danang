const pool = require("../database");

studentModel = module.exports;

studentModel.getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE id = ?", [id.toString()]);

  return rows[0] ? rows[0] : null;
}

studentModel.getByUserId = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE user_id = ?", [user_id]);

  return rows[0] ? rows[0] : null;
}

studentModel.create = async (student) => {
  const [result] = await pool.query(
    "INSERT INTO students (id, fullname, user_id, faculty, class, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [student.id, student.fullname, student.user_id, student.faculty, student.class, student.email, student.phone]
  );

  if (result.affectedRows) {
    return await studentModel.getById(student.id);
  }

  return null;
}

studentModel.update = async (student_id, student) => {
  let query = 'UPDATE students SET ';
  let setStatements = [];

  const newStudentId = student.id || student_id;

  if (student.id) {
    setStatements.push(`id = '${student.id}'`);
  }

  if (student.fullname) {
    setStatements.push(`fullname = '${student.fullname}'`);
  }

  if (student.faculty) {
    setStatements.push(`faculty = '${student.faculty}'`);
  }

  if (student.class) {
    setStatements.push(`class = '${student.class}'`);
  }

  if (student.email) {
    setStatements.push(`email = '${student.email}'`);
  }

  if (student.phone) {
    setStatements.push(`phone = '${student.phone}'`);
  }

  if (setStatements.length === 0) {
    return null;
  }

  query += setStatements.join(', ') + ` WHERE id = '${student_id}'`;

  const [result] = await pool.query(query);

  if (result.affectedRows) {
    return await studentModel.getById(newStudentId);
  }

  return null;
}

studentModel.delete = async (id) => {
  const [result] = await pool.query("DELETE FROM students WHERE id = ?", [id.toString()]);

  if (result.affectedRows) {
    return true;
  }

  return false;
}
