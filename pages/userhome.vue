<template lang="pug">
  .home-screen
    .user-greeting
      h1.greeting Hello, {{loggedInUser}}!
    .user-info-display
      p.total-today-text(v-if="logsRetrieved") Today's total: {{totalToday}}
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
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/shared-text"
@import "~/assets/shared-container"

.home-screen
  +container-mixin(100px)

  .user-greeting
    .greeting
      +text-mixin($basic-text-color, 48px)

  .user-info-display
    .total-today-text
      +text-mixin($basic-text-color, 40px)
    .retrievelogs-error-text
      +text-mixin($error-text-color, 40px)

  .user-logout
    margin-top: 20px
</style>