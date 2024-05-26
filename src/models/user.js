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
