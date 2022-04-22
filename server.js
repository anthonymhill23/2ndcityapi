'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weather = require('./modules/weather');
const movie = require('./modules/movie');


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/weather', weatherHandler);

function weatherHandler(request, response) {
  const { city } = request.query;
  weather(city)
    .then(weatherSummaries => response.send(weatherSummaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
}

app.get('/movies', movieHandler);

function movieHandler(request, response) {
  const { city } = request.query;
  movie(city)
    .then(movieSummaries => response.send(movieSummaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!')
    });
}



app.listen(PORT, () => console.log(`Server up on ${PORT}`));