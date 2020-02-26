<template lang="pug">
  .home-screen
    .user-greeting
      h1.greeting Hello, {{loggedInUser}}!
    .user-info-display
      .connected-display(v-if="logsRetrieved")
        p.total-today-text Today's total: {{totalToday}}
        .amount-input
          input.amount-input-box(type="number", v-model="amount", min="0", max="1000", step="any", placeholder="Enter amount (oz)")
          button.button-blue(@click="submitDrinklog") Submit
      p.retrievelogs-error-text(v-else-if="retrieveLogsErrorMessage != ''") {{retrieveLogsErrorMessage}}

    .user-logout
      button.button-blue(@click="logout") Logout
</template>

<script>
import { auth } from '~/plugins/firebase';
import { mapState, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  middleware: 'authenticated',
  data() {
    return {
      amount: ''
    }
  },
  created() {
    this.$store.dispatch('user/GET_DRINKLOGS');
  },
  computed: {
    ...mapState({
      loggedInUser: state => state.user.id,
      logsRetrieved: state => state.user.logsRetrieved,
      retrieveLogsErrorMessage: state => state.user.retrieveLogsErrorMessage,
      totalToday: state => state.user.totalToday
    }),
    ...mapGetters({
      totalToday: 'user/totalToday'
    })
  },
  methods: {
    logout: function (event) {
      auth.signOut()
        .then(() => {
          this.$store.commit('user/CLEAR');

          // route to login page
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
        })
    },
    submitDrinklog: function (event) {
      let amount = this.amount;
      if (amount != '') {
        this.amount = '';
        this.$store.dispatch('user/SUBMIT_DRINKLOG', amount);
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/shared-text"
@import "~/assets/shared-container"
@import "~/assets/shared-input"

.home-screen
  +container-mixin(100px)

  .user-greeting
    .greeting
      +text-mixin($basic-text-color, 48px)
      padding-bottom: 20px

  .user-info-display
    .total-today-text
      +text-mixin($basic-text-color, 40px)
      padding-bottom: 5px

    .amount-input-box
      +text-input-mixin(200px)
      &[type=number]::-webkit-inner-spin-button,
      &[type=number]::-webkit-outer-spin-button
        -webkit-appearance: none
        margin: 0
      &[type=number]
        -moz-appearance: textfield;

    .retrievelogs-error-text
      +text-mixin($error-text-color, 40px)

  .user-logout
    margin-top: 20px
</style>