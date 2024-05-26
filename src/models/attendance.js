const pool = require('../database');

const attendanceModel = module.exports;

attendanceModel.deleteByStudentId = async (student_id) => {
    const [result] = await pool.query('DELETE FROM attendances WHERE student_id = ?', [student_id]);

    if (result.affectedRows) {
        return true;
    }

    return false;
}
