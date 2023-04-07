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

const winston = require("winston");

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),

    transports: [
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

bdd.connectTodB();

logger.log({
    level: "debug",
    message: "Connecté à la BDD",
    source: "app"
});





const port = 3000;
routes.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
