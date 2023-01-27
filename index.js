'require-strict';

/*
LANCEMENT MONGO DB : mongod --dbpath "C:\Users\kevin\Desktop\Node TP2\mongoBDD"
*/

const express = require('express');
const mongobd = require('mongodb');
const morgan = require('morgan');
const url = require('url');

const bdd = require("./src/services/db/mongodb.js");
bdd.connectTodB();

const app = express()
app.use(morgan('combined'))
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
