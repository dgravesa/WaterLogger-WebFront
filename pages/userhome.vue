<template lang="pug">
  .home-screen
    .user-greeting
      h1.greeting Hello, {{loggedInUser}}!
    .user-info-display
      p.total-today-text Today's total: {{totalToday}}

    .user-logout
      button.button-blue(@click="logout") Logout
</template>

<script>
import { auth } from '~/plugins/firebase';

export default {
  middleware: 'authenticated',
  data() {
    return {
      drinkLogs: [  // TODO: pull this from server
        { time: "", amount: 7.5 },
        { time: "", amount: 16 },
        { time: "", amount: 12 },
      ]
    }
  },
  computed: {
    loggedInUser: function() {
      return this.$store.state.user.id || '';
    },
    totalToday: function () {
      return this.drinkLogs.reduce((total, drinklog) => {
        return total + drinklog.amount;
      }, 0);
    },
  },
  methods: {
    logout: function (event) {
      auth.signOut()
        .then(() => {
          // route to login page
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/shared-text'

.home-screen
  .user-greeting
    margin: 10px
    .greeting
      +text-mixin($basic-text-color, 66px)

  .user-info-display
    .total-today-text
      +text-mixin($basic-text-color, 48px)

  .user-logout
    margin: 20px
</style>