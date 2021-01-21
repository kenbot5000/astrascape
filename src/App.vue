<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-app-bar-title>Astrascape</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item @click="goto('home')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item>
          <v-list-item @click="goto('entry')">
            <v-list-item-icon>
              <v-icon>mdi-zodiac-leo</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Birthday Input </v-list-item-title>
          </v-list-item>
          <v-list-item @click="toggleHowto">
            <v-list-item-icon>
              <v-icon>mdi-account-question-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title> How to Install </v-list-item-title>
          </v-list-item>
          <v-list-item @click="toggleSettings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main app>
      <v-dialog width="400" v-model="howToDialog">
        <v-card>
          <v-card-title>How to Install </v-card-title>
          <v-card-text>
            This web app is a progressive web app (PWA), which means it is available to be installed on your phone as an app! 
            Just click the three dots or similar button on your browser, and press "Add to home page". The app will soon be installed.
            <b>NOTE: The app runs through a proxy to the API, so the load times for the horoscopes themselves are a little slow.</b>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog width="400" v-model="settings">
        <v-card class="pa-4">
          <h4>Settings</h4>
          Set theme to:
          <v-row class="d-flex flex-column">
            <v-col>
              <v-btn color="primary" @click="setTheme(themes[0])">Blue</v-btn>
            </v-col>
            <v-col>
              <v-btn color="success" @click="setTheme(themes[1])">Silver</v-btn>
            </v-col>
            <v-col>
              <v-btn color="secondary" @click="setTheme(themes[2])">Gold</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      
      <transition name="fade">
        <EntryScreen v-if="step == 'entry'" @begin="getSign" @goto="goto" />
        <Home v-if="step == 'home'" :zodiacs="zodiacs" @viewSign="viewSign" />
      </transition>
      <Horoscope v-if="step == 'viewScope'" :zodiac="sign" @back="goto" />
    </v-main>
  </v-app>
</template>

<script>
// import axios from 'axios';
import EntryScreen from '@/components/EntryScreen';
import Horoscope from '@/components/Horoscope';
import Home from '@/components/Home';

export default {
  name: 'App',
  components: {
    EntryScreen,
    Horoscope,
    Home
  },
  data () {
    return {
      themes: [
        {
          name: 'blue',
          dark: {
            primary: '#125E8A',
            secondary: '#858585',
            success: '#EFA00B'
          }
        },
        {
          name: 'silver',
          dark: {
            primary: '#858585',
            secondary: '#EFA00B',
            success: '#125E8A'
          }
        },
        {
          name: 'gold',
          dark: {
            primary: '#EFA00B',
            secondary: '#858585',
            success: '#125E8A'
          }
        }
      ],
      howToDialog: false,
      settings: false,
      drawer: false,
      step: 'entry',
      year: 0,
      date: {},
      zodiacs: [
        {
          start: [3, 21],
          end: [4, 20],
          sign: 'aries'
        },
        {
          start: [4, 21],
          end: [5, 21],
          sign: 'taurus'
        },
        {
          start: [5, 22],
          end: [6, 21],
          sign: 'gemini'
        },
        {
          start: [6, 22],
          end: [7, 23],
          sign: 'cancer'
        },
        {
          start: [7, 24],
          end: [8, 23],
          sign: 'leo'
        },
        {
          start: [8, 24],
          end: [9, 23],
          sign: 'virgo'
        },
        {
          start: [9, 24],
          end: [10, 23],
          sign: 'libra'
        },
        {
          start: [10, 24],
          end: [11, 22],
          sign: 'scorpio'
        },
        {
          start: [11, 23],
          end: [12, 21],
          sign: 'sagittarius'
        },
        {
          start: [12, 22],
          end: [12, 31],
          sign: 'capricorn'
        },
        {
          start: [1, 1],
          end: [1, 20],
          sign: 'capricorn'
        },
        {
          start: [1, 21],
          end: [2, 19],
          sign: 'aquarius'
        },
        {
          start: [2, 20],
          end: [3, 20],
          sign: 'pisces'
        },
      ],
      sign: ''
    }
  },
  methods: {
    viewSign (sign) {
      this.sign = sign;
      this.step = 'viewScope';
    },
    toggleHowto () {
      this.howToDialog = !this.howToDialog;
    },
    toggleSettings () {
      this.settings = !this.settings;
    },
    setTheme (theme) {
      const name = theme.name;
      const dark = theme.dark;
      // set themes
      Object.keys(dark).forEach(i => {
        this.$vuetify.theme.themes.dark[i] = dark[i];
      });
      // also save theme name to disable selection
      this.$vuetify.theme.themes.name = name;
    },
    getStamp (month, day, year = this.year) {
      return new Date(year, month - 1, day);
    },
    getSign (date) {
      console.log('Date inputted', date)
      date = date.split('-')
      this.year = date[0]
      this.date = this.getStamp(date[1], date[2])
      // * YYYY-MM-DD
      for (let zodiac of this.zodiacs) {
        if((this.getStamp(zodiac.start[0], zodiac.start[1]) <= this.date) && (this.date <= this.getStamp(zodiac.end[0], zodiac.start[1]))) {
          this.sign = zodiac.sign;
        }
      }
      this.step = 'viewScope'
    },
    goto (page) {
      this.step = page;
    }
  },
  mounted () {
    this.setTheme(this.themes[0])
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>