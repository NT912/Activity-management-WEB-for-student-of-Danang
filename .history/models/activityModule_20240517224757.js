
const { name } = require('ejs');
const db = require('../util/database');

exports.AddActivity = (act, callback) => {
  return new Promise((resolve, reject) => {
    console.log(act);
      const query = `INSERT INTO activity VALUES (null,${act.idOrganization},'${act.name}','${act.desc}','${act.date_start}','${act.date_end}','${act.date_start_regis}','${act.date_end_regis}','${act.location}',false,false,'${act.poster}',null)`;
      console.log(query);
      db.query(query, (err, res) => {
        if (err)
        {
            callback(err,null)
        } else
        {
            callback(null, res)
        }
      });
  });
}
exports.GetallActivity = () => {
  return new Promise((resolve, reject) => {
      const query = `SELECT Id_activity, Id_organization, Name_activity, activity.Description, Date_start, Date_end, Date_start_registe, Date_end_registe, Location, image, Id, Name, avatar FROM activity INNER JOIN organization on organization.Id = activity.Id_organization`;
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });}





exports.GetGame = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM Game where idGame = ${id}`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
}

exports.GetDeveloperOfGame = (id) => {
  return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Builder
      INNER JOIN DeveloperOfGame ON (Builder.idBuilder = DeveloperOfGame.id_builder)
      WHERE DeveloperOfGame.id_game = ${id}`;
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}
exports.GetArtistGame = (id) => {
  return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Builder
      INNER JOIN ArtistGame ON (Builder.idBuilder = ArtistGame.id_builder)
      WHERE ArtistGame.id_game = ${id}`;
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}
exports.GetDesignerGame = (id) => {
  return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Builder
      INNER JOIN DesignerGame ON (Builder.idBuilder = DesignerGame.id_builder)
      WHERE DesignerGame.id_game = ${id}`
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

exports.GetCateorieOfOneGame = (id) => {
  return new Promise((resolve, reject) => {
      const query = `SELECT idCategories AS 'id', name FROM CategoriesGame
      INNER JOIN CategoryOfGame on CategoryOfGame.idCategories = CategoriesGame.idCategoriesGame
      WHERE CategoryOfGame.idGame = ${id}`;
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}



exports.UpdateAvtGame = (avt, callback) => {
  return new Promise((resolve, reject) => {
    const sanitizedName = name ?? null;

      const query = `UPDATE Game SET avt = '${avt}' WHERE idGame = ""`;
      db.query(query, (err, res) => {
        if (err)
        {
            callback(err,null)
        } else
        {
            callback(null, res)
        }
      });
  });
}

exports.GetAllGame = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT idGame, name, avt FROM Game`;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
}


exports.AddNewCategorie = (name, desc, callback) => {
  return new Promise((resolve, reject) => {
      if (name != null && desc != null)
      {
        const query = `INSERT INTO CategoriesGame VALUES (null,'${name}','${desc}')`;
        db.query(query, (err, res) => {
          if (err)
          {
              callback(err,null)
          } else
          {
              callback(null, res)
          }
        });
      }
      
  });
}

exports.GetAllCategories = () =>
{
  return new Promise((resolve, reject) => {
    const query = `SELECT idCategoriesGame AS 'id', name FROM CategoriesGame`;
    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
});
}

exports.AddCatergoriOfGame = (idGame,inform, callback) =>
{
  return new Promise((resolve, reject) => {
    inform.forEach(element => {
      const query =`INSERT INTO CategoryOfGame VALUES (null,${idGame},${element.idCatagori},${element.range})`;
      db.query(query, (err, res) => {
        if (err) {
          result = false; 
          return callback(err, null);
        } else {
          
        }
      });
    });
    callback(null, "ok");
});
}
