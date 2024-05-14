const bcrypt = require('bcrypt');
const {validationResult, Result} = require('express-validator');
const GameModule = require('../models/activityModule');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const db = require('../util/database');
const { response, request } = require('express');
require('../util/redis').getRedis();
const firebase = require('../util/firebase');
const bodyParser = require('body-parser');

class Activity {
  constructor(
    idOrganization,
    name,
    date_start,
    date_end,
    date_start_regis,
    date_end_regis,
    location,
    desc,
    poster
  ) {
    this.idOrganization = idOrganization,
    this.name = name;
    this.date_start = date_start;
    this.date_end = date_end;
    this.date_start_regis = date_start_regis;
    this.date_end_regis = date_end_regis;
    this.location = location;
    this.desc = desc;
    this.poster = poster;
  }

  print() {
    console.log("Name:", this.name);
    console.log("Start Date:", this.date_start);
    console.log("End Date:", this.date_end);
    console.log("Registration Start Date:", this.date_start_regis);
    console.log("Registration End Date:", this.date_end_regis);
    console.log("Location:", this.location);
    console.log("Description:", this.desc);
    console.log("Poster:", this.poster);
  }
}


exports.GET_GetAllActivity = async (req, res, next) => {
  try{
    async function GetCategories()
    {
      return await GameModule.GetAllCategories();
    }
    async function GetGam() {
      return await GameModule.GetAllGame();
    }
    const games = await GetGam();
    const categories = await GetCategories();
    return res.render('game/game', {
      isLogin: true,
      Games: games,
      Categories: categories,
    });
  } catch (err)
  {
    console.log(err);
  }
}

exports.GET_CreatePost = (req, res, next) =>
{
  return res.render('activity/createpost', {
    isLogin: true,
  });
}

exports.GET_Register = (req, res, next) =>
{
  return res.render('activity/register', {
    isLogin: true,
  });
}
exports.POST_CreateActivity = (req, res, next) =>
{
    const {
      name,
      date_start,
      date_end,
      date_start_regis,
      date_end_regis,
      location,
      desc,
    } = req.body;
    const dateTime = new Date().getTime();
    var poster = req.file;
    const storage = getStorage();
    const storageRef = ref(storage,`poster/${poster.originalname + " " + dateTime}`)

    // Lấy thông tin metadata của tệp
    const metadata = {
      contentType: req.file.mimetype,
    };
    function uploadFirebase(callback) {
      uploadBytesResumable(storageRef, poster.buffer, metadata)
        .then((uploadSnapshot) => {
          snapshot = uploadSnapshot;
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          downloadURL = url;
          callback(downloadURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
    uploadFirebase((downloadURL) => {
      const act = new Activity(
        2,
      name,
      date_start,
      date_end,
      date_start_regis,
      date_end_regis,
      location,
      desc,
      downloadURL,
      );
      AddActDatabse(act)
      .then((result) => {
          res.redirect('/home/NTC');
      }
    )
    .catch((error) => {
      console.log(error);
      res.render('game/gameadd', {
        error: "An error occurred"
      });
    });
    });
    
    async function AddActDatabse(act) {
      try
      {
        GameModule.AddActivity(act,(err, res) => {
          if (err) {
            console.log(err);
            return {
              error: "fail to add game to database",
            }
          }
          else{
            return {
              error: '',
            }
          }
        })
      } 
      catch (err)
      {
        console.log(err);
        return {
          error: "An error occured",
        }
      }
    }
}










exports.getGameDetail = async (req, res, next) => {
    const id = parseInt(req.params.gameId);
    if (id)
    {
      async function GetGam(id) {
        return GameModule.GetGame(id);
      }
      async function GetDevGame(id) {
        return GameModule.GetDeveloperOfGame(id);
      }
      async function GetArtistGame(id) {
        return GameModule.GetArtistGame(id);
      }
      async function GetDesignGame(id) {
        return GameModule.GetDesignerGame(id);
      }
      async function GetAllCategories() {
        return GameModule.GetAllCategories(id);
      }
      async function GetCategories(id) {
        return GameModule.GetCateorieOfOneGame(id);
      }
      const Game = await GetGam(id);
      const GameDev = await GetDevGame(id);
      const GameArt = await GetArtistGame(id);
      const Gamedes = await GetDesignGame(id);
      const GameCater = await GetAllCategories(id);
      const CatOfGame = await GetCategories(id);

      return res.render('game/gamedetail', {
        isLogin: true,
        Game: Game[0],
        GameDev: GameDev,
        GameArt: GameArt,
        GameDes: Gamedes,
        GameCategori: GameCater,
        CatOfGame: CatOfGame,
      });
    }
};


exports.Get_AddNewCategorieGame = (req, res, next) => 
{
  res.render('game/addcategoriegame',{
    isLogin: true,
  });
}

exports.POST_AddNewCategorieGame = (req, res, next) => 
{
  const { name, desc } = req.body;
  if (name != null && desc != null)
  {
    async function AddCategoriDatabase(name, desc) {
      try
      {
        GameModule.AddNewCategorie(name, desc,(err, res) => {
          if (err) {
            console.log(err);
            return {
              error: "fail to add game to database",
            }
          }
          else{
            return {
              error: '',
            }
          }
        })
      } 
      catch (err)
      {
        console.log(err);
        return {
          error: "An error occured",
        }
      }
    }

    AddCategoriDatabase(name, desc)
    .then((result) => {
      res.redirect('/game');
    })
    
  } else
  {
    res.render('game/addcategoriegame',{
      isLogin: true,
    });
  }
  
}

exports.POST_AddCatergorieOfGame = (req, res, next) => 
{
  const id = parseInt(req.params.gameId);
  const inform = req.body;
  if (id != null && inform != null)
  {
    async function AddCategoriOfGamee(idGame, inform) {
      try
      {
        GameModule.AddCatergoriOfGame(idGame, inform,(err, res) => {
          if (err) {
            console.log(err);
            return {
              error: "fail to add game to database",
            }
          }
          else{
            console.log(res);
            return {
              error: '',
            }
          }
        })
      } 
      catch (err)
      {
        console.log(err);
        return {
          error: "An error occured",
        }
      }
    }

    AddCategoriOfGamee(id, inform)
    .then((result) => {
      res.json("success");
    })
    
  } else
  {
    res.json({ message: 'fail' });
  }
  
  
}
  