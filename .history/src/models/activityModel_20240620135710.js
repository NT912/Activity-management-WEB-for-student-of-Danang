const pool = require("../database");

const datetimeUtils = require("../utils/datetime");

const activityModel = module.exports;

activityModel.add = async (activity) => {
  const queryText = `
    INSERT INTO activities(name, organization_id, description, start_date, end_date, registration_start_date, registration_end_date, location, maxnumber, image)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    activity.number,
    activity.image,
  ]);

  return result;
};

exports.AddActivity = (act, callback) => {
  return new Promise((resolve, reject) => {
    console.log(act);
    const query = `
    INSERT INTO activities(name, organization_id, description, start_date, end_date, registration_start_date, registration_end_date, location, image)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    const values = [
      act.idOrganization,
      act.name,
      act.desc,
      act.date_start,
      act.date_end,
      act.date_start_regis,
      act.date_end_regis,
      act.location,
      act.poster,
    ];
    db.query(query, values, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  });
};

activityModel.GetAll = async (num) => {
  const query = `SELECT A.id, A.name, A.description, A.location, A.image,  U.username, U.id as idUser
  FROM activities A
  INNER JOIN organizations O ON A.organization_id = O.user_id
  INNER JOIN users U ON O.user_id = U.id
  Where A.Confirm = 'done' ORDER BY A.id DESC`;
  const [result] = await pool.query(query);
  return result;
};

activityModel.GetAllWaitConfirm = async (num) => {
  const query = `SELECT A.id, A.name, A.description, A.location, A.image,  U.username, U.id as idUser
  FROM activities A
  INNER JOIN organizations O ON A.organization_id = O.user_id
  INNER JOIN users U ON O.user_id = U.id
  Where A.Confirm != 'done'`;
  const [result] = await pool.query(query);
  return result;
};

activityModel.GetById = async (id) => {
  const query = `SELECT A.id, A.organization_id, A.name, A.description, A.start_date, A.end_date, A.registration_start_date,
  A.registration_end_date, A.location, A.maxnumber, A.image,A.Confirm, A.created_at, A.updated_at, A.comment, U.username, U.id as idUser, O.avt
  FROM activities A
  INNER JOIN organizations O ON A.organization_id = O.user_id
  INNER JOIN users U ON O.user_id = U.id
  Where A.id = ?`;
  const [result] = await pool.query(query, id);
  return result[0];
};

activityModel.GetActSVRegistered = async (student_id) => {
  const query = `SELECT A.id, A.name, A.description,  A.location, A.image,U.username, U.id as idUser
  FROM registrations R
  INNER JOIN activities A ON R.activity_id = A.id
  INNER JOIN users U ON U.id = A.organization_id
  WHERE R.student_id = ? AND A.start_date > CURRENT_TIME()`;
  const values = student_id;
  const [result] = await pool.query(query, values);
  return result;
};

activityModel.GetActSVJoined = async (student_id) => {
  const query = `SELECT A.id, A.name, A.description,  A.image, U.username, U.id as idUser
  FROM registrations R
  INNER JOIN activities A ON R.activity_id = A.id
  INNER JOIN users U ON U.id = A.organization_id
  WHERE R.student_id = ? AND R.isAttendance = true
  `;
  const values = student_id;
  const [result] = await pool.query(query, values);
  return result;
};

activityModel.GetActNTCDone = async (organization_id) => {
  const query = `
  SELECT A.id, A.name, A.description,  A.image, U.username, U.id as idUser
  FROM activities A
  INNER JOIN users U ON U.id = A.organization_id
  WHERE A.Confirm = 'done' and CURRENT_TIME() > A.end_date AND A.organization_id = ?
  `;
  const values = organization_id;
  const [result] = await pool.query(query, values);
  return result;
};

activityModel.GetActNTCWait = async (organization_id) => {
  const query = `
  SELECT A.id, A.name, A.description,  A.image, U.username, U.id as idUser
  FROM activities A
  INNER JOIN users U ON U.id = A.organization_id
  WHERE (A.Confirm = 'yet' || A.Confirm = 'confirm' || A.Confirm = 'reject') and CURRENT_TIME() < A.end_date AND A.organization_id = ?
  `;
  const values = organization_id;
  const [result] = await pool.query(query, values);
  return result;
};

activityModel.GetActNTCProcess = async (organization_id) => {
  const query = `
  SELECT A.id, A.name, A.description,  A.image, U.username, U.id as idUser
  FROM activities A
  INNER JOIN users U ON U.id = A.organization_id
  WHERE A.Confirm = 'done' and CURRENT_TIME() <= A.end_date AND A.organization_id = ?
  `;
  const values = organization_id;
  const [result] = await pool.query(query, values);
  return result;
};

activityModel.GetActSave = async (user_id) => {
  const query = `
  SELECT A.id, A.name, A.description,  A.image,  U.username, U.id as idUser
  FROM saved S
  INNER JOIN activities A ON S.activity_id = A.id
  INNER JOIN users U ON U.id = S.user_id
  WHERE U.id = ?`;
  const values = user_id;
  const [result] = await pool.query(query, values);
  return result;
};

activityModel.update = async (activity_id, activity) => {
  let query = `
  UPDATE activities SET
      name = ?,
      description = ?,
      start_date = ?,
      end_date = ?,
      registration_start_date = ?,
      registration_end_date = ?,
      location = ?,
      Confirm = 'update'
      `;
  const values = [
    activity.name,
    activity.description,
    activity.start_date,
    activity.end_date,
    activity.registration_start_date,
    activity.registration_end_date,
    activity.location,
  ];

  if (activity.image) {
    query += `, image = ?`;
    values.push(activity.image);
  }

  query += ` WHERE id = ?`;
  values.push(activity_id);

  const [result] = await pool.query(query, values);

  if (result.affectedRows) {
    return true;
  }

  return false;
};

activityModel.backup = async (activity) => {
  const queryText = `
  INSERT INTO activities_backup(activity_id, name, description, start_date, end_date, registration_start_date, registration_end_date, location, maxnumber, image, confirm)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(queryText, [
    activity.activity_id,
    activity.name,
    activity.description,
    activity.start_date,
    activity.end_date,
    activity.registration_start_date,
    activity.registration_end_date,
    activity.location,
    activity.number,
    activity.image,
    activity.confirm,
  ]);

  return result;
};

activityModel.GetBackupActivity = async (activity_id) => {
  const queryText = `
    SELECT * FROM activities_backup
    WHERE activity_id = ?
    ORDER BY updated_at DESC
    LIMIT 1
  `;

  const [result] = await pool.query(queryText, [activity_id]);
  return result[0];
};

activityModel.ChangeState = async (newstate, activity_id) => {
  const queryText = `
    UPDATE activities
    SET Confirm = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(queryText, [newstate, activity_id]);

  if (result.affectedRows) {
    return true;
  }

  return false;
};

activityModel.Changecomment = async (comment, activity_id) => {
  const queryText = `
    UPDATE activities
    SET comment = ?
    WHERE id = ?
  `;

  const [result] = await pool.query(queryText, [comment, activity_id]);

  if (result.affectedRows) {
    return true;
  }

  return false;
};

activityModel.register = async (
  activity_id,
  student_id,
  email,
  phone_number,
  wish
) => {
  const queryText = `
    INSERT INTO registrations(activity_id, student_id, email, phone_number, wish)
    VALUES(?, ?, ?, ? ,?)
  `;
  const values = [activity_id, student_id, email, phone_number, wish];
  const [result] = await pool.query(queryText, values);

  return result.affectedRows || null;
};

activityModel.unregister = async (activity_id, student_id) => {
  const queryText = `
    DELETE FROM registrations
    WHERE activity_id = ? AND student_id = ?
  `;

  const [result] = await pool.query(queryText, [
    activity_id,
    student_id.toString(),
  ]);

  return result.affectedRows || null;
};

activityModel.isRegistered = async (activity_id, student_id) => {
  const queryText = `
    SELECT * FROM registrations
    WHERE activity_id = ? AND student_id = ?
  `;
  const [result] = await pool.query(queryText, [activity_id, student_id]);
  console.log(result.length);
  return result.length > 0;
};

activityModel.isRegistered = async (activity_id, student_id) => {
  const queryText = `
    SELECT * FROM registrations
    WHERE activity_id = ? AND student_id = ?
  `;
  const [result] = await pool.query(queryText, [activity_id, student_id]);
  return result.length > 0;
};

activityModel.ChangeConfirmRegister = async (
  activity_id,
  student_id,
  isConfirm
) => {
  const queryText = `
  UPDATE registrations R
  SET isComfirm = ${isConfirm}
  WHERE R.activity_id = ? AND R.student_id = ?
  `;
  const values = [activity_id, student_id];
  const [result] = await pool.query(queryText, values);
  return result.affectedRows > 0;
};

activityModel.GetListRegistationOfActivity = async (activity_id) => {
  const queryText = `
  SELECT R.id, R.student_id, U.username, U.id, R.email, R.phone_number, R.isComfirm, S.masv, S.class, F.name as faculty, R.isComfirm, R.isAttendance, R.wish
  FROM registrations R
  INNER JOIN students S ON S.user_id = R.student_id
  INNER JOIN users U ON S.user_id = U.id
  INNER JOIN faculty F ON S.faculty = F.idFaculty
  WHERE R.activity_id = ?
  `;
  const [result] = await pool.query(queryText, [activity_id]);
  return result;
};

activityModel.search = async (query) => {
  const queryText = `
    SELECT * FROM activities
    WHERE name LIKE ? OR description LIKE ?
  `;

  const [activities] = await pool.query(queryText, [
    `%${query}%`,
    `%${query}%`,
  ]);

  return activities;
};

activityModel.getActivityRegistrationsAttendences = async (
  activity_id,
  student_id = null
) => {
  let queryText = `
    SELECT students.*, registrations.id AS registration_id, attendances.id AS attendance_id
    FROM activities
    LEFT JOIN registrations ON registrations.activity_id = activities.id
    LEFT JOIN students ON students.id = registrations.student_id
    LEFT JOIN attendances ON attendances.activity_id = activities.id AND attendances.student_id = students.id
    WHERE activities.id = ?
    GROUP BY students.id
  `;

  const variables = [activity_id];

  if (student_id) {
    queryText += " AND students.id != ?";
    variables.push(student_id.toString());
  }

  const [rows] = await pool.query(queryText, variables);

  return rows.filter((row) => row.id);
};

activityModel.isAttendanced = async (activity_id, student_id) => {
  const queryText = `
    SELECT * FROM attendances
    WHERE activity_id = ? AND student_id = ?
  `;

  const [result] = await pool.query(queryText, [
    activity_id,
    student_id.toString(),
  ]);

  return result[0] ? true : false;
};

activityModel.attendance = async (activity_id, student_id) => {
  const queryText = `
    INSERT INTO attendances(activity_id, student_id)
    VALUES(?, ?)
  `;

  const [result] = await pool.query(queryText, [
    activity_id,
    student_id.toString(),
  ]);

  return result.affectedRows || null;
};

activityModel.getStudentActivities = async (student_id) => {
  const queryText = `
    SELECT activities.*, organizations.name as organization_name, attendances.id AS attendance_id
    FROM activities
    JOIN registrations ON activities.id = registrations.activity_id
    JOIN organizations ON activities.organization_id = organizations.user_id
    LEFT JOIN attendances ON activities.id = attendances.activity_id AND attendances.student_id = registrations.student_id
    WHERE registrations.student_id = ?
  `;

  const [activities] = await pool.query(queryText, [student_id.toString()]);

  return activities;
};

activityModel.delete = async (activity_id) => {
  const queryText = `
    DELETE FROM activities
    WHERE id = ?
  `;

  const [result] = await pool.query(queryText, [activity_id]);

  return result.affectedRows || null;
};

activityModel.isSaved = async (activity_id, user_id) => {
  const queryText = `SELECT * FROM saved WHERE user_id = ? AND activity_id = ?`;

  const [result] = await pool.query(queryText, [user_id, activity_id]);
  return result || null;
};

activityModel.save = async (user_id, activity_id) => {
  const queryText = `
    INSERT INTO saved (user_id, activity_id) VALUES (?, ?)
  `;

  const [result] = await pool.query(queryText, [user_id, activity_id]);
  return result.affectedRows || null;
};

activityModel.Get_EmailByACtConfirm = async (activity) => {
  const queryText = `
  SELECT registrations.email
  FROM activities
  JOIN registrations ON activities.id = registrations.activity_id
  JOIN organizations ON activities.organization_id = organizations.user_id
  WHERE activities.id = ? AND registrations.isComfirm = true
  `;

  const [result] = await pool.query(queryText, activity);
  return result;
};

activityModel.Get_EmailByACtAttendance = async (activity) => {
  const queryText = `
  SELECT registrations.email
  FROM activities
  JOIN registrations ON activities.id = registrations.activity_id
  JOIN organizations ON activities.organization_id = organizations.user_id
  WHERE activities.id = ? AND registrations.isAttendance = true
  `;

  const [result] = await pool.query(queryText, activity);
  return result;
};