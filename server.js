'use strict';

//REQUIRE
//In servers we have require instead of import.
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const weatherReport = require('./weather.js');
const movie = require('./movie.js');

//USE
//Once we have required something, we need to use it. This is where we aaasign the required field variable. REact does this with one step 'import'. Express takes 2 steps. 'require' and use'
const app = express();
app.use(cors());

//define port and vaildate .env
const PORT = process.env.PORT || 3002;

//ROUTES
//we will write endpoints here
//app.get coorrelates to axios.get it's very similar
app.get('/weather', weatherReport);

app.get('/movies', movie);
console.log(movie)
console.log(weatherReport)

app.get('*', (req, res) => {
  res.send('No such directory');
});

//ERRORS
//Handle Errors
app.use((error, request, response, next) => {
  if (error) {
    response.status(500).send(error.message);
  } else{
    next(error);
  }
});

// Classes

//LISTEN
//Start the server
//Liten is a function that takes in a port value and callback.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));