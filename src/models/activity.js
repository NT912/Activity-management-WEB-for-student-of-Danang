const pool = require('../database');
const pathUtils = require('../utils/path');

const activityModel = module.exports;

activityModel.getById = async (id) => {
  const queryText = `
    SELECT activities.*, organizations.name AS organization_name
    FROM activities
    INNER JOIN organizations ON activities.organization_id = organizations.id
    WHERE activities.id = ?
  `;

  const [result] = await pool.query(queryText, [id]);

  if (result[0] && result[0].image) {
    result[0].image = pathUtils.processImagePath(result[0].image);
  }

  return result[0] || null;
}

activityModel.add = async (activity) => {
  const queryText = `
    INSERT INTO activities(name, organization_id, description, start_date, end_date, registration_start_date, registration_end_date, location, image)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(queryText, [
    activity.name,
    activity.organization_id,
    activity.description,
    activity.start_date,
    activity.end_date,
    activity.registration_start_date,
    activity.registration_end_date,
    activity.location,
    activity.image,
  ]);

  if (result.insertId) {
    return await this.getById(result.insertId);
  }

  return null;
}

activityModel.getAll = async (withOrganization = false, organization = null) => {
  let queryText = `
    SELECT * FROM activities
  `;

  const where = [];

  if (organization) {
    where.push(`organization_id = ${organization.id}`);
  }

  if (withOrganization) {
    queryText = `
      SELECT activities.*, organizations.name as organization_name
      FROM activities
      JOIN organizations ON activities.organization_id = organizations.id
    `;
  }

  if (where.length) {
    queryText += ` WHERE ${where.join(' AND ')}`;
  }

  const [activities] = await pool.query(queryText);

  activities.forEach((activity) => {
    activity.image = pathUtils.processImagePath(activity.image);
  });
  return activities;
}
