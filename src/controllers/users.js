const crypto = require('crypto');

const crud = require('./../services/db/crud.js');

module.exports = {

  findUserByUsername: async(username)=>{
    return await crud.findOne('users', {"username":username} );
  },

  findUserById: async(id)=>{
    return await crud.findOne('users', {"id":id} );
  },

  createUserWithUsername: async(username)=>{
    const user = {
      "username": username,
      "id": crypto.randomBytes(4).toString('hex')
    }

    crud.insertOne('users', user);

    return user;
  }

}
