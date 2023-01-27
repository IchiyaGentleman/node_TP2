'use-strict';
const userControllers = require("../controllers/users.js");
const movieControllers = require("../controllers/movies.js");

//This function will initialize API routes for users
module.exports = async(app)=>{

  app.post('/movies/create', async(req, res)=>{
    if(req.body.title==undefined){
      res.status(400).json({
        "route": "/movies/create",
        "args": {
          "title": "A String representing the name of this film"
        },
        "return": "An object representing the film"
      });
      return;
    }



    if(await movieControllers.findMovieWithName(req.body.title+'')){
      res.status(400).json({
        "error": "Movie already registered !"
      });
      return;
    }

    const movie = await movieControllers.createMovie(req.body.title+'');

    //Seems valid
    return res.json(movie);
  });

}
