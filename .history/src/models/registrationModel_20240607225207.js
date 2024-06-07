const pool = require("../database");

const registrationModel = module.exports;

registrationModel.deleteByStudentId = async (student_id) => {
  const [result] = await pool.query(
    "DELETE FROM registrations WHERE student_id = ?",
    [student_id.toString()]
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
};

registrationModel.updateStudent = async (old_id, new_id) => {
  if (old_id === new_id) {
    return true;
  }

  const [result] = await pool.query(
    "UPDATE registrations SET student_id = ? WHERE student_id = ?",
    [new_id.toString(), old_id.toString()]
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
};

registrationModel.attendent = async (activity_id, studentId) => {
  const [result] = await pool.query(
    "UPDATE registrations SET isAttendance = 1 WHERE student_id = ? AND activity_id = ?",
    [studentId, activity_id]
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
};
