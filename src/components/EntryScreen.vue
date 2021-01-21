<template>
  <v-container class="d-flex justify-center align-center" fill-height fluid>
    <v-card width="400" class="d-flex align-center flex-column py-4" color="primary">
      <h4 class="text-h5 text-center">Welcome to Astrascape.</h4>
      <h5 class="text--secondary text-center mb-4">Enter your birthdate to continue.</h5>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="picker"
          v-model="date"
          :max="new Date().toISOString().substr(0, 10)"
          @change="save"
        ></v-date-picker>
      </v-menu>
      <v-alert color="secondary" v-model="alert">Your birthdate is required.</v-alert>
      <v-btn color="success" class="mt-4" @click="submitDate">Get your horoscope</v-btn>
      <v-btn color="secondary" class="mt-4" @click="goHome">View all</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      date: null,
      menu: false,
      alert: false,
    }
  },
  watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      submitDate () {
        this.alert = false;
        if(this.date == null || this.date == '') {
          this.alert = true;
        } else {
          this.$emit('begin', this.date)
        }
      },
      goHome () {
        this.$emit('goto', 'home')
      }
    },
}
</script>

<style>

</style>