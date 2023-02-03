'strict-mode';
const crypto = require('crypto');
const axios = require('axios');

const conf = require("../../conf.json");
const crud = require('./../services/db/crud.js');

module.exports = {

  createMovie: async(title)=>{
    const film = {
      "title": title,
      "id": crypto.randomBytes(4).toString('hex'),
      "year": "0",
      "language": "French",
      "imdbRating": 0,
      "note": ""
    }

    crud.insertOne('movies', film);

    return film;
  },

  findMovieWithName: async(title)=>{
    return await crud.findOne('movies', {"title":title} );
  },

  findMovieWithId: async(id)=>{
    return await crud.findOne('movies', {"id":id} );
  },

  get: async(query)=>{
    return await crud.find('movies', query);
  },

  setnote: async(movie)=>{
    crud.updateOne('movies', {"id":movie.id}, {"$set": {"note":movie.note}});
  },

  getFromOmdb: async(title)=>{
    try{
      const response = await axios.get('http://www.omdbapi.com/?t=London&apikey='+conf.tp2.APIKEY);

      const film = {
        "title": response.data.Title,
        "id": crypto.randomBytes(4).toString('hex'),
        "year": response.data.Year,
        "language": response.data.Language,
        "imdbRating": response.data.imdbRating,
        "note": "Imported from OMDBApi"
      }

      crud.insertOne('movies', film);

      return film

    }catch(e){
      console.log(e);
    }
  }

}
