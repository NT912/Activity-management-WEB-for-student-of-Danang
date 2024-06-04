const pool = require("../database");

studentModel = module.exports;

studentModel.getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE masv = ?", [id.toString()]);

  return rows[0] ? rows[0] : null;
}

studentModel.getByMasv = async (id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE masv = ?", [id.toString()]);

  return rows[0] ? rows[0] : null;
}

studentModel.getByMasvCheckLogin = async (id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE masv = ?", [id.toString()]);

  return rows[0] ? rows[0] : null;
}

studentModel.getByUserId = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM students WHERE user_id = ?", [user_id]);

  return rows[0] ? rows[0] : null;
}

studentModel.getSvRegister = async (user_id) => {
  const [rows] = await pool.query(`
  SELECT S.*, U.username, F.name
  FROM students S 
  INNER JOIN users U ON U.id = S.user_id 
  INNER JOIN faculty F ON F.idFaculty = S.faculty
  WHERE user_id = ?
  `, [user_id]);

  return rows[0] ? rows[0] : null;
}

studentModel.GetAvtByMasv = async (masv) => {
  const [rows] = await pool.query("SELECT avt FROM students WHERE masv = ?", [masv]);

  return rows[0] ? rows[0].avt : null;
}

studentModel.GetProfileById = async (user_id) =>
{
  const query = `SELECT masv, class, email, F.name as faculty, F.idFaculty , phone, S.avt, U.username
  FROM students S 
  INNER JOIN users U ON U.id = S.user_id
  INNER JOIN faculty F ON F.idFaculty = S.faculty
  WHERE S.user_id = ?`;
  const [rows] = await pool.query(query, [user_id]);

  return rows[0] ? rows[0] : null;
}

studentModel.create = async (student) => {
  const [result] = await pool.query(
    "INSERT INTO students (masv, user_id, faculty, class) VALUES (?, ?, ?, ?)",
    [student.id, student.user_id, student.faculty, student.class]
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
