'use-strict';
const userControllers = require("../controllers/users.js");
const movieControllers = require("../controllers/movies.js");
const watchlistsControllers = require("../controllers/watchlists.js");

//This function will initialize API routes for users
module.exports = async(app)=>{

  app.post('/watchlists/create', async(req, res)=>{
    if(req.body.userId==undefined || req.body.name==undefined){
      res.status(400).json({
        "route": "/watchlists/create",
        "args": {
          "userId": "A String representing the ID of the user",
          "name": "The name for this watchlist"
        },
        "return": "An object representing the watchlist"
      });
      return;
    }

    if(! await userControllers.findUserById(req.body.userId+'')){
      res.status(400).json({
        "error": "This user don't exists !"
      });
      return;

    }


    if(await watchlistsControllers.findWatchlistWithUserAndName(req.body.userId+'', req.body.name)){
      res.status(400).json({
        "error": "Watchlist already registered !"
      });
      return;
    }

    const watchlist = await watchlistsControllers.createWatchlist(req.body.userId+'', req.body.name);

    //Seems valid
    return res.json(watchlist);
  });

}
