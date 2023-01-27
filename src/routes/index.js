const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./users.js');
const moviesRoutes = require('./movies.js');
const watchlistsRoutes = require('./watchlists.js');

const app = express();
//const users = require('./users');

const metrics = {
    requestsCount: {},
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.use((req, res, next) => {
    const currentUrlRequestsCount = metrics.requestsCount[req.url];
    metrics.requestsCount[req.url] = currentUrlRequestsCount
        ? currentUrlRequestsCount + 1
        : 1;
    return next();
});

app.get('/', (req, res, next) => {
    return res.send('Hello World !');
});

app.get('/health', (req, res, next) => {
    return res.status(200).json({ status: 'healthy' });
});

app.get('/metrics', (req, res, next) => {
    metrics.uptime = `${process.uptime().toFixed(2)} seconds`;
    return res.json(metrics);
});


//Définition des routes :
userRoutes(app);
moviesRoutes(app);
watchlistsRoutes(app);

module.exports = app;
