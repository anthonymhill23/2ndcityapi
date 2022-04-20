const axios = require ('axios');

const errorHandle = require('./error');

async function movie(request, response) {
  try {
    let city = request.query.city;

    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&total_results=3`);
    // console.log(url);
    let cityMovie = await axios.get(url);

    // console.log(cityMovie);

    let movieDisplay = [];

    cityMovie.data.results.forEach(title => {

      let movie = new Movie(title);
      // console.log(movie);
      movieDisplay.push(movie);
    });

    response.send(movieDisplay);

  } catch (error) {
    errorHandle(error);
  }
}

class Movie {
  constructor(element) {
    this.title = element.title;
    this.description = element.overview;
    this.language = element.original_language;
    this.tagline = element.tagline;
  }
}
module.exports = movie;