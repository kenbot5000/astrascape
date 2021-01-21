<template>
  <v-container class="d-flex justify-center align-center" fill-height fluid>
    <v-card width="400" class="d-flex align-center flex-column py-4" color="primary">
      <h4 class="text-h5">Your sign is: {{ zodiac.toUpperCase() }}</h4>
      <h5 class="text--secondary">This is your horoscope for: {{ zodiacData.data.date }}</h5>
      <v-card-text>
        <p>
          {{ zodiacData.data.horoscope }}
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="back">Home</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    zodiac: String
  },
  data () {
    return {
      zodiacData: {}
    }
  },
  methods: {
    back () {
      this.$emit('back', 'home')
    }
  },
  async mounted () {
    const data = await axios.get(`https://cors-anywhere.herokuapp.com/http://ohmanda.com/api/horoscope/${this.zodiac}`);
    this.zodiacData = data;
  },
  
}
</script>

<style>

</style>