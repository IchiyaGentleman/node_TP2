'strict-mode';
const crypto = require('crypto');

const crud = require('./../services/db/crud.js');

module.exports = {

  createWatchlist: async(userId, name)=>{
    const watchlist = {
      "owner": userId,
      "name": name,
      "id": crypto.randomBytes(4).toString('hex'),
      "movies": [],
      "note": ""
    }

    crud.insertOne('watchlists', watchlist);

    return watchlist;
  },

  deleteWatchlist: async(id)=>{
    crud.deleteOne('watchlists', {"id":id});
  },

  findWatchlistWithUserAndName: async(userId, name)=>{
    return await crud.findOne('watchlists', {"owner":userId, "name": name} );
  },
  findWatchlistWithID: async(watchlistId)=>{
    return await crud.findOne('watchlists', {"id":watchlistId} );
  },

  setMovies: async(watchlist)=>{
    crud.updateOne('watchlists', {"id":watchlist.id}, {"$set": {"movies":watchlist.movies}})
  },

  getUsersWhatchlists: async(userid)=>{
    return await crud.find('watchlists', {"owner":userid});
  }

}
