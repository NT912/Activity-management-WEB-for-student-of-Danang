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

registrationModel.updateStudent = async (registrationId, studentId) => {
  const [result] = await pool.query(
    "UPDATE registrations SET student_id = ? WHERE student_id = ?",
    [new_id.toString(), old_id.toString()]
  );

  if (result.affectedRows) {
    return true;
  }

  return false;
};
