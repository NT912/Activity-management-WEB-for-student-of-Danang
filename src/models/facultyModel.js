const pool = require('../database');

const facultyModel = module.exports;

facultyModel.getAllFaculty = async () => {
    const rows = await pool.query("SELECT * FROM faculty");
  
    return rows ? rows : null;
  }