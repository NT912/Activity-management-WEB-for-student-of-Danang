const pool = require("../database");

organizationModel = module.exports;


organizationModel.getByUserId = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM organizations WHERE user_id = ?", [user_id]);

  return rows[0] ? rows[0] : null;
}

organizationModel.getByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM organizations WHERE email = ?", [email]);

  return rows[0] ? rows[0] : null;
}

organizationModel.GetProfileById = async (id) => {
  const query = `
  SELECT user_id,U.username, O.description, O.address, O.email, O.phone, O.avt
  FROM organizations O
  INNER JOIN users U ON O.user_id = U.id
  WHERE U.id = ?
  `
  const [rows] = await pool.query(query, id);

  return rows[0] ? rows[0] : null;
}

organizationModel.GetAvtByEmail = async (email) => {
  const [rows] = await pool.query("SELECT avt FROM organizations WHERE email = ?", [email]);
  return rows[0] ? rows[0].avt : null;
}

organizationModel.create = async (organization) => {
  const [result] = await pool.query(
    "INSERT INTO organizations (user_id, email) VALUES (?, ?)",
    [organization.user_id, organization.email]
  );

  if (result.insertId) {
    return await organizationModel.getByUserId(result.insertId);
  }

  return null;
}

organizationModel.update = async (organization_id, organization) => {
  var query = `
  UPDATE organizations 
  SET email = ?, phone = ?, address = ?, description = ?
  WHERE user_id = ?
  `
  const values = [organization.email, organization.phone, organization.address, organization.description, organization_id]
 
  var [result] = await pool.query(query, values);

  if (result.affectedRows) {
    query = `
    UPDATE users 
    SET username = ?
    WHERE id = ?
    `;
    [result] = await pool.query(query, [organization.name, organization_id]);
    if (result.affectedRows) return true; else return false;
  }
  else{
    return false;
  }
}

organizationModel.delete = async (id) => {
  const [result] = await pool.query("DELETE FROM organizations WHERE id = ?", [id]);

  if (result.affectedRows) {
    return true;
  }

  return false;
}

organizationModel.getAll = async () => {
  const [rows] = await pool.query("SELECT * FROM organizations");

  return rows;
}
