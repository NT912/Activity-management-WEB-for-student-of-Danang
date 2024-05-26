const pool = require("../database");

organizationModel = module.exports;

organizationModel.getById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM organizations WHERE id = ?", [id]);

  return rows[0] ? rows[0] : null;
}

organizationModel.create = async (organization) => {
  const [result] = await pool.query(
    "INSERT INTO organizations (user_id, name, description, address, email, phone) VALUES (?, ?, ?, ?, ?, ?)",
    [organization.user_id, organization.name, organization.description, organization.address, organization.email, organization.phone]
  );

  if (result.insertId) {
    return await organizationModel.getById(result.insertId);
  }

  return null;
}
