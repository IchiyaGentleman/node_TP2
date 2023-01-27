'strict-mode';
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
  },

  updateUserWithUsername: async(oldUsername, newUsername)=>{
    if(! await module.exports.findUserByUsername(oldUsername))return undefined;//User don't exist

    await crud.updateOne('users', {"username":oldUsername}, {"$set": {"username":newUsername}})
    .catch(err=>{console.log(err)});

    return await module.exports.findUserByUsername(newUsername);
  }

}
