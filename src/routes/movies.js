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
      logger.log({
          level: "warn",
          message: "Film déjà enregistré : "+req.body.title,
          source: "Movies"
      });
      return;
    }

    const movie = await movieControllers.createMovie(req.body.title+'');

    logger.log({
        level: "info",
        message: "Film créé : "+req.body.title,
        source: "Movies"
    });

    //Seems valid
    return res.json(movie);
  });

  app.post('/movies/get', async(req, res)=>{
    if(false){
      res.status(400).json({
        "route": "/movies/get",
        "args": {
          "year": "Not required. An int representing the release year of this movie",
          "language": "Not required. The language of the movies",
          "imdbRating": "Not required. Int representing the imdbRating score"
        },
        "return": "An object representing every films"
      });
      return;
    }

    let query = {};

    if(req.body.year) query['year']=req.body.year;//If param given, we will search it
    if(req.body.language) query['language']=req.body.language;
    if(req.body.imdbRating) query['imdbRating']=req.body.imdbRating;

    const movies = await movieControllers.get(query);

    logger.log({
        level: "info",
        message: "Film obtenu",
        source: "Movies"
    });

    //Seems valid
    return res.json(movies);
  });

  app.post('/movies/setnote', async(req, res)=>{
    if(req.body.movieId==undefined || req.body.note==undefined){
      res.status(400).json({
        "route": "/movies/setnote",
        "args": {
          "movieId": "The ID representing the movie",
          "note": "The description of this movie"
        },
        "return": "An object representing this movie"
      });
      return;
    }

    const movie = await movieControllers.findMovieWithId(req.body.movieId);
    if(!movie){
      res.status(400).json({
        "error": "Movie don't exists !"
      });
      logger.log({
          level: "warn",
          message: "Film non trouvé : "+req.body.movieId,
          source: "Movies"
      });
      return;
    }

    movie.note = req.body.note;
    movieControllers.setnote(movie)
    .then(()=>{
      return res.json(movie);
    });

    logger.log({
        level: "info",
        message: "Note ajoutée pour le film "+req.body.movieId,
        source: "Movies"
    });
  });

  app.post('/movies/createomdb', async(req, res)=>{
    if(req.body.title==undefined){
      res.status(400).json({
        "route": "/movies/createomdb",
        "args": {
          "title": "A String representing the name of this film, to search on OMDB API"
        },
        "return": "An object representing the film"
      });
      return;
    }



    if(await movieControllers.findMovieWithName(req.body.title+'')){
      res.status(400).json({
        "error": "Movie already registered !"
      });
      logger.log({
          level: "warn",
          message: "Film déjà récupéré depuis omdb : "+req.body.title,
          source: "Movies"
      });
      return;
    }

    const movie = await movieControllers.getFromOmdb(req.body.title+'');

    //Seems valid
    return res.json(movie);

    logger.log({
        level: "info",
        message: "Film récupéré depuis omdb : "+req.body.title,
        source: "Movies"
    });
  });


}
