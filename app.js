const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');

var port = process.env.PORT; // 2. Using process.env.PORT

app.use(express.static(path.join(__dirname, 'angular')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// //mongodb atlas url
const url = "mongodb+srv://god:Xacdw2z2H8OGR9D9@mycinema-a1olt.mongodb.net/favortiesdb?retryWrites=true";
mongoose.connect(url, { useNewUrlParser: true });


let db = mongoose.connection;
db.once('open', () => {
    console.log("Connected to db");
});



// allow CORS
//for us to be able to work with angular local envierment 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

const favoriteRouter = require('./routes/favorites.js');
app.use('/api/favorite', favoriteRouter);


const songInDetailsRouter = require('./routes/songInDetail.js');
app.use('/api/songInDetail/', songInDetailsRouter);


//ANGULAR
app.use('/', (req, res, next) => {
    res.sendFile("index.html", { root: path.join(__dirname, 'angular') })
});
app.use('*', (req, res, next) => {
    res.redirect('/');
});


app.listen(port || 3000);

