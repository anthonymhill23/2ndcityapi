'use strict';

//REQUIRE
//In servers we have require instead of import.
const express = require('express');
const cors = require('cors');
require('dotenv').config();
let weatherData = require('./data/weather.json');

//USE
//Once we have required something, we need to use it. This is where we aaasign the required field variable. REact does this with one step 'import'. Express takes 2 steps. 'require' and use'
const app = express();
app.use(cors());

//define port and vaildate .env
const PORT = process.env.PORT || 3002;

//ROUTES
//we will write endpoints here
//app.get coorrelates to axios.get it's very similar
app.get('/weather', (request, response) => {
  try {
    let city= request.query.city;
    console.log(city);
    let cityWeather = weatherData.find(location => location.city_name === city);
    console.log(cityWeather);
    let weatherDisplay = [];
    cityWeather.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherDisplay.push(forecast);
      console.log(weatherDisplay);
    });

    response.send(weatherDisplay);

  } catch (error) {
    response.status(500).send(error.message);
  }
});

app.get('*', (req, res) => {
  res.send('No such directory');
});

//ERRORS
//Handle Errors
app.use((error, request, response) => {
  response.status(500).send(error.message);
});

// Classes
class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}
//LISTEN
//Start the server
//Liten is a function that takes in a port value and callback.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));