const axios = require ('axios');

const errorHandle = require('./error');

async function weather(request, response) {
  try {
    let city = request.query.city;

    let url = (`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=US&key=${process.env.WEATHER_API_KEY}`);

    let cityWeather = await axios.get(url);

    // console.log(cityWeather);

    let weatherDisplay = [];

    cityWeather.data.data.forEach(date => {

      let forecast = new Forecast(date);
      // console.log(forecast);
      weatherDisplay.push(forecast);
    });

    response.send(weatherDisplay);

  } catch(error) {
    errorHandle(error);
  }
}
class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}

module.exports = weather;