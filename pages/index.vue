<template lang="pug">
  .container(v-if="loginStateInitialized")
    .logo-title
      Logo
      h1.title WaterLogger

    LoginConsole(:error-message="loginErrorMessage" v-on:submit="attemptLogin")

    p.signup-text Don't have an account? #[nuxt-link.signup-link(to="/signup") Sign up]
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
@import "~/assets/shared-container.sass"

.container
  +container-mixin(80px)

.logo-title
  padding-bottom: 20px

  .title
    +text-mixin($basic-text-color, 100px)

.signup-text
  margin-top: 20px
  +text-mixin($basic-text-color, 20px)
  .signup-link
    +link-mixin
</style>
