'strict-mode';
const crypto = require('crypto');

const crud = require('./../services/db/crud.js');

module.exports = {

  createMovie: async(title)=>{
    const film = {
      "title": title,
      "id": crypto.randomBytes(4).toString('hex')
    }

    crud.insertOne('movies', film);

    return film;
  },

  findMovieWithName: async(title)=>{
    return await crud.findOne('movies', {"title":title} );
  }

}
