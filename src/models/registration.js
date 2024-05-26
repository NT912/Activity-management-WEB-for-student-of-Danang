const pool = require('../database');

const registrationModel = module.exports;

registrationModel.deleteByStudentId = async (student_id) => {
    const [result] = await pool.query('DELETE FROM registrations WHERE student_id = ?', [student_id]);

    if (result.affectedRows) {
        return true;
    }

    return false;
}
