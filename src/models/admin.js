const pool = require('../database');

const adminModel = module.exports;

adminModel.getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM administrators WHERE id = ?', [id]);
    return rows[0] || null;
}

adminModel.getByUserId = async (user_id) => {
  const [rows] = await pool.query('SELECT * FROM administrators WHERE user_id = ?', [user_id]);
  return rows[0] || null;
}

adminModel.create = async (admin) => {
    const [result] = await pool.query(
      'INSERT INTO administrators (user_id, fullname, email, phone) VALUES (?, ?, ?, ?)',
      [admin.user_id, admin.fullname, admin.email, admin.phone]
    );

    if (result.insertId) {
        return await adminModel.getById(result.insertId);
    }

    return null;
}
