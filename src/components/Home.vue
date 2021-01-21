<template>
  <v-container fill-height fluid>
    <v-row class="d-flex flex-column align-center">
      <v-col v-for="zodiac in zodiacSigns" :key="zodiac.sign">
        <v-card class="pa-5 d-flex justify-space-between" color="primary" @click="viewZodiac(zodiac.sign)">
          <h4>{{ capitalize(zodiac.sign) }}</h4>
          <v-icon>mdi-zodiac-{{ zodiac.sign }}</v-icon>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    zodiacs: Array
  },
  data () {
    return {
      zodiacSigns: this.zodiacs
    }
  },
  methods: {
    capitalize(s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },
    viewZodiac (sign) {
      this.$emit('viewSign', sign)
    }
  },
  mounted () {
    for (let i in this.zodiacSigns) {
      if(this.zodiacSigns[i].sign == 'capricorn') {
        this.zodiacSigns.splice(i, 1)
      } 
    }
  }
}
</script>

<style>

</style>