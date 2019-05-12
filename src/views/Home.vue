<template>
  <div class="home">
    <div class="row">
      <div class="col-8 offset-2">
        <div class="input-group mb-3">
        <input v-model="location" type="text" class="form-control" placeholder="Location">
        <div class="input-group-append">
          <button @click="updateLocation" class="btn btn-outline-primary" type="button">
            Search</button>
        </div>
      </div>
      </div>
      <div v-if="forecast" class="col-8 offset-2 text-center">
        <div class="card text-white bg-secondary mb-3">
          <div class="card-header">{{address}}</div>
          <div class="card-body">
            <h4 class="card-title">{{forecast.currently.summary}}</h4>
            <p class="card-text icon-temp">
              {{icons[forecast.currently.icon]}}
              {{forecast.currently.temperature}} F
            </p>
            <p class="card-text">
              {{forecast.currently.precipProbability}} % chance of precipitation.
              {{forecast.minutely.summary}}
            </p>
          </div>
        </div>
      </div>
      <div class="col-8 offset-2" ref="map">
        <iframe
          id="map-embed-iframe"
          frameborder="0"
          height="500px"
          width="100%"
          :src='embedURL'></iframe>
      </div>
    </div>
    <!-- <pre>{{forecast}}</pre> -->
  </div>
</template>

<script>
import API from '@/lib/API';

export default {
  name: 'home',
  data() {
    return {
      embedURL: '',
      location: localStorage.location || '',
      address: localStorage.address || '',
      forecast: null,
      icons: {
        'clear-day': 'a',
        'clear-night': 'b',
        rain: 'c',
        snow: 'd',
        sleet: 'e',
        wind: 'f',
        fog: 'g',
        cloudy: 'h',
        'partly-cloudy-day': 'i',
        'partly-cloudy-night': 'j',
      },
    };
  },
  mounted() {
    this.loadWeather(localStorage.lat || '37.8267', localStorage.lng || '-122.4233');
  },
  methods: {
    loadWeather(lat, lng) {
      localStorage.lat = lat;
      localStorage.lng = lng;
      this.embedURL = API.getEmbedURL(lat, lng);
      API.getAddress(lat, lng).then((result) => {
        this.address = [result.name, result.street].join();
        localStorage.address = this.address;
      });
      API.getForecast(lat, lng).then((result) => {
        this.forecast = result;
      });
    },
    updateLocation() {
      localStorage.location = this.location;
      API.getCoordinates(this.location).then((result) => {
        // console.log(result.latitude, result.longitude);
        this.loadWeather(result.latitude, result.longitude);
      });
    },
  },
};
</script>

<style lang='scss'>

.icon-temp {
  font-size: 2em;
}
</style>
