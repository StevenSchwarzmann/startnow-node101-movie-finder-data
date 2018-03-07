const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const app = express();

app.use(logger('dev'));

var cache = {
    url: '',
    data: ''
}

app.get('/', function (req, res) {
    var imovie = req.query.i;
    var tmovie = req.query.t;
    console.log(imovie, tmovie);
    if (imovie) {
        if (cache.url === imovie) {
            res.json(cache.data);
        } else {
            axios.get('http://www.omdbapi.com/?i=' +
                imovie +
                '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = imovie;
                    cache.data = response.data;
                    res.json(response.data);
                }).catch(err => res.status(200).send("hope"))
        }
    } else if (tmovie) {
        if (cache.url === tmovie) {
            res.json(cache.data);
        } else {
            var url = tmovie.replace(' ', '%20');
            axios.get('http://www.omdbapi.com/?t=' +
                url +
                '&apikey=8730e0e')
                .then(function (response) {
                    cache.url = tmovie;
                    cache.data = response.data;
                    res.json(response.data);
                }).catch(err => res.status(200).send("hope"))
        }
    }
});


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;