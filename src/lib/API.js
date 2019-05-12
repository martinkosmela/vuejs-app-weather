const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '27ee59722983b17fa4dff6041fc2a975';
const location = '37.8267,-122.4233';
const WEATHER_API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/${location}`;
const GEO_API_URL = `${proxy}https://darksky.net/geo?q=`

function getForecast() {
  // promise format, waiting for data to come back
  // fetch(API_URL)
  //   .then(response => response.json())
  //   .then(result => {
  //     console.log(result);
  //   });
  return fetch(WEATHER_API_URL)
    .then(response => response.json());  
}

function getCoordinates(location) {
  // return fetch(`${GEO_API_URL}${location}`)
  return fetch(GEO_API_URL + location)
    .then(response => response.json());  
}

// export an object which has a function in it
export default {
  getForecast,
  getCoordinates
}
