const pool = require('../database');

const datetimeUtils = require('../utils/datetime');

const activityModel = module.exports;

activityModel.getById = async (id) => {
  const queryText = `
    SELECT activities.*, organizations.name AS organization_name
    FROM activities
    INNER JOIN organizations ON activities.organization_id = organizations.id
    WHERE activities.id = ?
  `;

  const [result] = await pool.query(queryText, [id]);

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
    datetimeUtils.formatStartDatetime(activity.start_date),
    datetimeUtils.formatEndDatetime(activity.end_date),
    datetimeUtils.formatStartDatetime(activity.registration_start_date),
    datetimeUtils.formatEndDatetime(activity.registration_end_date),
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

  return activities;
}

activityModel.update = async (activity_id, activity) => {
  const queryText = `
    UPDATE activities
    SET name = ?, organization_id = ?, description = ?, start_date = ?, end_date = ?, registration_start_date = ?, registration_end_date = ?, location = ?, image = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(queryText, [
    activity.name,
    activity.organization_id,
    activity.description,
    datetimeUtils.formatStartDatetime(activity.start_date),
    datetimeUtils.formatEndDatetime(activity.end_date),
    datetimeUtils.formatStartDatetime(activity.registration_start_date),
    datetimeUtils.formatEndDatetime(activity.registration_end_date),
    activity.location,
    activity.image,
    activity_id,
  ]);

  if (result.affectedRows) {
    return await this.getById(activity_id);
  }

  return null;
}

activityModel.verify = async (activity_id, admin_id) => {
  const queryText = `
    UPDATE activities
    SET admin_id = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(queryText, [admin_id, activity_id]);

  if (result.affectedRows) {
    return await this.getById(activity_id);
  }

  return null;
}

activityModel.unverify = async (activity_id) => {
  const queryText = `
    UPDATE activities
    SET admin_id = NULL
    WHERE id = ?
  `;

  const [result] = await pool.query(queryText, [activity_id]);

  if (result.affectedRows) {
    return await this.getById(activity_id);
  }

  return null;
}

activityModel.register = async (activity_id, student_id) => {
  const queryText = `
    INSERT INTO registrations(activity_id, student_id)
    VALUES(?, ?)
  `;

  const [result] = await pool.query(queryText, [activity_id, student_id]);

  return result.affectedRows || null;
}

activityModel.unregister = async (activity_id, student_id) => {
  const queryText = `
    DELETE FROM registrations
    WHERE activity_id = ? AND student_id = ?
  `;

  const [result] = await pool.query(queryText, [activity_id, student_id]);

  return result.affectedRows || null;
}

activityModel.isRegistered = async (activity_id, student_id) => {
  const queryText = `
    SELECT * FROM registrations
    WHERE activity_id = ? AND student_id = ?
  `;

  const [result] = await pool.query(queryText, [activity_id, student_id]);

  return result.length > 0;
}

activityModel.search = async (query) => {
  const queryText = `
    SELECT * FROM activities
    WHERE name LIKE ? OR description LIKE ?
  `;

  const [activities] = await pool.query(queryText, [`%${query}%`, `%${query}%`]);

  return activities;
}

activityModel.getActivityRegistrationsAttendences = async (activity_id, student_id = null) => {
  let queryText = `
    SELECT students.*, registrations.id AS registration_id, attendances.id AS attendance_id
    FROM activities
    LEFT JOIN registrations ON registrations.activity_id = activities.id
    LEFT JOIN attendances ON attendances.activity_id = activities.id
    LEFT JOIN students ON students.id = registrations.student_id OR students.id = attendances.student_id
    WHERE activities.id = ?
  `;

  const variables = [activity_id];

  if (student_id) {
    queryText += ' AND students.id != ?'
    variables.push(student_id);
  }

  const [rows] = await pool.query(queryText, variables);

  return rows.filter(row => row.id);
}
