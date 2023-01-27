'use-strict';
const crypto = require('crypto');
const crud = require('./../services/db/crud.js');

//This function will initialize API routes for users
module.exports = async(app)=>{

  app.post('/users/create', async(req, res) => {
    if(req.body.username==undefined){
      res.status(400).json({
        "route": "/users/create",
        "args": {
          "username": "A String representing the name of this user"
        },
        "return": "An object representing the created user"
      });
      return;
    }

    const user = {
      "username": req.body.username+'',
      "id": crypto.randomBytes(4).toString('hex')
    }

    if(await crud.findOne('users', {"username":req.body.username+''} )){
      res.status(400).json({
        "error": "Username already taken !"
      });
      return;
    }

    crud.insertOne('users', user);

    //Seems valid
    return res.json(user);
  });

}
