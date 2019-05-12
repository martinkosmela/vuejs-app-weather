<template>
  <div class="home">
    <div class="row">
      <div class="col-8 offset-2">
        <div class="input-group mb-3">
        <input v-model="location" type="text" class="form-control" placeholder="Location">
        <div class="input-group-append">
          <button @click="updateLocation" class="btn btn-outline-primary" type="button">Search</button>
        </div>
      </div>
      </div>
      <div v-if="forecast" class="col-8 offset-2 text-center">
        <div class="card text-white bg-secondary mb-3">
          <div class="card-header">Current weather</div>
          <div class="card-body">
            <h4 class="card-title">{{forecast.currently.summary}}</h4>
            <p class="card-text icon-temp">
              {{icons[forecast.currently.icon]}}
              {{forecast.currently.temperature}} F
            </p>
            <p class="card-text">
              {{forecast.currently.precipProbability}} % chance of precipitation
            </p>
          </div>
        </div>
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
      location: '',
      forecast: null,
      icons: {
        'clear-day': 'a',
        'clear-night': 'b',
        'rain': 'c',
        'snow': 'd',
        'sleet': 'e',
        'wind': 'f',
        'fog': 'g',
        'cloudy': 'h',
        'partly-cloudy-day': 'i',
        'partly-cloudy-night' : 'j'
      },
    };
  },
  mounted() {
    API.getForecast().then(result => {
      // console.log(result);
      this.forecast = result;
    });
  },
  methods: {
    updateLocation() {
      API.getCoordinates(this.location).then(result => {
        console.log(result);
      });
    }
  },
};
</script>

<style lang='scss'>

.icon-temp {
  font-size: 2em;
}
</style>
