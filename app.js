'require-strict';

/*
LANCEMENT MONGO DB : mongod --dbpath "C:\Users\kevin\Desktop\Node TP2\mongoBDD"
*/

const express = require('express');
const mongobd = require('mongodb');
const morgan = require('morgan');
const url = require('url');

const bdd = require("./src/services/db/mongodb.js");
const routes = require("./src/routes/index.js");

bdd.connectTodB();



const port = 3000;
routes.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
