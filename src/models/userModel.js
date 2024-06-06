const md5 = require("md5");

const pool = require("../database");

userModel = module.exports;

userModel.getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);

  return rows[0] ? rows[0] : null;
}

userModel.getByUsername = async (username) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
  return rows[0] ? rows[0] : null;
}

userModel.getByUserEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM organizations WHERE email = ?", [email]);

  return rows[0] ? rows[0] : null;
}

userModel.getByUserMasv = async (masv) => {
  const [rows] = await pool.query(`SELECT * FROM users U
  INNER JOIN students S ON U.id = S.user_id
  WHERE S.masv = ?`, [masv]);
  return rows[0] ? rows[0] : null;
}

userModel.GetOrganiAcByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM users U
  INNER JOIN organizations O ON U.id = O.user_id
  WHERE O.email = ?`, [email]);
  return rows[0] ? rows[0] : null;
}

userModel.GetAdminByemail = async (email) => {
  const [rows] = await pool.query(`
  SELECT * FROM users U
  INNER JOIN administrators A ON U.id = A.user_id
  WHERE A.email = ?
  `, [email]);
  return rows[0] ? rows[0] : null;
}

userModel.create = async (user) => {
  hashed_password = md5(user.password);

  const [result] = await pool.query(
    "INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)",
    [user.username, hashed_password, user.role]
  );

  if (result.insertId) {
    return await userModel.getById(result.insertId);
  }

  return null;
}

userModel.delete = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows) {
    return true;
  }

  return false;
}

userModel.getByRole = async (role) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = ?", [role]);

  return rows;
}

userModel.updateAvtSV = async (url, student_id) => {
  let query = `
  UPDATE students 
  SET avt = ?
  where user_id = ?`;
  const values = [url, student_id]
  
  const [result] = await pool.query(query, values);

  if (result.affectedRows) {
    return true
  }

  return false;
}

userModel.updateAvtNTC = async (url, organization_id) => {
  let query = `
  UPDATE organizations 
  SET avt = ?
  where user_id = ?`;
  const values = [url, organization_id]
  
  const [result] = await pool.query(query, values);

  if (result.affectedRows) {
    return true
  }

  return false;
}

userModel.update = async (user_id, user) => {
  let query = 'UPDATE users SET ';
  let setStatements = [];

  if (user.username) {
    setStatements.push(`username = '${user.username}'`);
  }

  if (user.password) {
    setStatements.push(`hashed_password = '${md5(user.password)}'`);
  }

  if (setStatements.length === 0) {
    return null;
  }

  query += setStatements.join(', ') + ` WHERE id = ${user_id}`;

  const [result] = await pool.query(query);

  if (result.affectedRows) {
    return await userModel.getById(user_id);
  }

  return null;
}
