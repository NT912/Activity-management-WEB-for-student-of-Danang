const { name } = require("ejs");
const db = require("../util/database");
const uuid = require("uuid");

/*
    register
*/
exports.GetAllFaculty = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM major`;
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.AddNewStudent = (masv, name, falcuty, classs, password, callback) => {
  const que = `insert into user (masv, name, class, hashpassword, falcutyId, role) 
  values ('${masv}','${name}','${classs}','${password}', ${falcuty}, 'STUDENT')`;
  db.query(que, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

exports.AddNewOrganization = (name, email, password, callback) => {
  const que = `insert into user (name, email, hashpassword, role) values (?, ?, ? , 'ORGANIZATION')`;
  const values = [name, email, password];
  db.query(que, values, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

exports.CountMasv = (masv) => {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT COUNT(masv) AS countMasv FROM user WHERE masv = '${masv}'`;
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.CountEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT COUNT(email) AS countEmail FROM user WHERE email = '${email}'`
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.CountName = (name) => {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT COUNT(name) AS countName FROM user WHERE name = '${name}'`
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.CheckLogin = (inform) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT idUser as id, hashpassword, role FROM user WHERE email = ? or masv = ? LIMIT 1';

    const values = [inform, inform];

    db.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
/*
    login
*/
exports.GetCheckLogin = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, COUNT(email) AS countemail, hass_password FROM User WHERE email = ?';

    const values = [email];

    db.query(query, values, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
