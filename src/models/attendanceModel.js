const pool = require('../database');

const attendanceModel = module.exports;

attendanceModel.deleteByStudentId = async (student_id) => {
    const [result] = await pool.query('DELETE FROM attendances WHERE student_id = ?', [student_id.toString()]);

    if (result.affectedRows) {
        return true;
    }

    return false;
}

attendanceModel.updateStudent = async (old_id, new_id) => {
  if (old_id === new_id) {
    return true;
  }

  const [result] = await pool.query('UPDATE registrations SET student_id = ? WHERE student_id = ?', [new_id.toString(), old_id.toString()]);

  if (result.affectedRows) {
    return true;
  }

  return false;
}
