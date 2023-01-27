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

}
