'use-strict';
const userControllers = require("../controllers/users.js");

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



    if(await userControllers.findUserByUsername(req.body.username+'')){
      res.status(400).json({
        "error": "Username already taken !"
      });
      return;
    }

    const user = await userControllers.createUserWithUsername(req.body.username+'');

    //Seems valid
    return res.json(user);
  });

  app.post('/users/update', async(req, res) => {
    if(req.body.oldUsername==undefined || req.body.newUsername==undefined){
      res.status(400).json({
        "route": "/users/create",
        "args": {
          "oldUsername": "A String representing the old name of this user",
          "newUsername": "A String representing the new name of this user"
        },
        "return": "An object representing the updated user"
      });
      return;
    }

    const user = await userControllers.updateUserWithUsername(req.body.oldUsername+'', req.body.newUsername+'');
    if(!user){
      res.status(400).json({
        "error": "Something went wrong !"
      });
      return;
    }

    //Seems valid
    return res.json(user);
  });

  app.post('/users/getUserWithUsername', async(req, res) => {
    if(req.body.username==undefined){
      res.status(400).json({
        "route": "/users/getUserWithUsername",
        "args": {
          "username": "A String representing the name of this user"
        },
        "return": "An object representing the updated user"
      });
      return;
    }

    const user = await userControllers.findUserByUsername(req.body.username+'');
    if(!user){
      res.status(400).json({
        "error": "User don't exists !"
      });
      return;
    }

    //Seems valid
    return res.json(user);
  });

  app.post('/users/getall', async(req, res) => {
    if(false){
      res.status(400).json({
        "route": "/users/getall",
        "return": "An object representing all users"
      });
      return;
    }

    const users = await userControllers.getAll();

    //Seems valid
    return res.json(users);
  });

}
