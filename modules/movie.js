'use strict';
const axios = require('axios');
let cache = require('./cache.js');
require('dotenv').config();

module.exports = getMovie;

function getMovie(city) {
  const key = 'movie-' + city;
  const url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`);

  if (cache[key] && (Date.now() - cache[key].timestamp < 1000*60*60*24*30)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(response => parseMovie(response.data));
  }

  return cache[key].data;
}

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(data => {
      return new Movie(data);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(data) {
    this.title = data.title;
    this.description = data.overview;
    this.language = data.original_language;
    this.tagline = data.tagline;
  }
}