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
  const que = `insert into organization (masv, name, class, hashpassword, falcuty) values ('${masv}','${name}','${classs}','${password}', ${falcuty})`;
  const params = [name, email, password];
  db.query(que, params, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};

exports.AddNewOrganization = (name, email, password, callback) => {
  // que = "INSERT INTO user VALUES(null, '"+name+"', '"+email+"','"+password+"',null,null,null,CURRENT_DATE())";

  const que = `insert into organization (Name, Email, 	hashpassword) values ('${name}', '${email}', '${password}')`;
  const params = [name, email, password];
  // console.log(que);
  db.query(que, params, (err, res) => {
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
      "SELECT COUNT(Masv) AS countMasv FROM student WHERE Masv = '" +
      masv +
      "'";
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
      "SELECT COUNT(Email) AS countEmail FROM organization WHERE Email = '" +
      email +
      "'";
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
      "SELECT COUNT(Name) AS countName FROM organization WHERE Name = '" +
      name +
      "'";
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.CheckLoginStudent = (mavs) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT hashpassword FROM student WHERE Masv = '" + mavs + "'";
    console.log(query);
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.CheckLoginNTC = (email) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT hashpassword FROM organization WHERE Email = '" + email + "'";
    db.query(query, (err, res) => {
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
    const query =
      "SELECT id,COUNT(email) AS countemail, hass_password FROM User WHERE email = '" +
      email +
      "'";
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
