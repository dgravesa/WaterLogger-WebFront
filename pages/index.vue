<template lang="pug">
  .container
    .logo-title
      Logo
      h1.title WaterLogger

    LoginConsole(:error-message="loginErrorMessage" v-on:submit="attemptLogin")
</template>

<script>
import Logo from '~/components/Logo.vue';
import LoginConsole from '~/components/LoginConsole.vue';
import firebase from 'firebase';

export default {
  data() {
    return {
      loginErrorMessage: '',
    }
  },
  components: {
    Logo, LoginConsole
  },
  methods: {
    attemptLogin: function (email, password) {
      this.loginErrorMessage = '';
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
          // go to user home page
          this.$router.push('/userhome');
        })
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
