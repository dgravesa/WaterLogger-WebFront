<template lang="pug">
  .container(v-if="loginStateInitialized")
    .logo-title
      Logo
      h1.title WaterLogger

    LoginConsole(:error-message="loginErrorMessage" v-on:submit="attemptLogin")
</template>

<script>
import Logo from '~/components/Logo.vue';
import LoginConsole from '~/components/LoginConsole.vue';
import { auth } from '~/plugins/firebase';

export default {
  data() {
    return {
      loginStateInitialized: false,
      loginErrorMessage: '',
    }
  },
  created() {
    // called by firebase whether user is logged in or not
    // TODO: consider making login page /login and making /userhome this index page
    auth.onAuthStateChanged((user) => {
      let userId = (user) ? user.email : null;
      this.$store.commit('user/SET_ID', userId);

      if (user) {
        // direct user to home page
        this.$router.push('/userhome');
      } else {
        // user is not logged in, so show the login console.
        this.loginStateInitialized = true;
      }
    })
  },
  components: {
    Logo, LoginConsole
  },
  methods: {
    attemptLogin: function (email, password) {
      this.loginErrorMessage = '';
      auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
          // show error message
          this.loginErrorMessage = 'Invalid email or password.';
        })
    },
  },
}
</script>

<style lang="sass">
@import "~/assets/shared-text.sass"

.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

.logo-title
  padding-bottom: 20px

  .title
    +text-mixin($basic-text-color, 100px)
</style>
