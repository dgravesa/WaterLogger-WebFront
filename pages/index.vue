<template lang="pug">
  .container
    .login-screen(v-if="loggedInUser == ''")
      .logo-title
        Logo
        h1.title WaterLogger

      .login-console
        input.login-field(v-model="userEmail", type="text", placeholder="Email")
        br
        input.login-field(v-model="userPassword", type="password", placeholder="Password")
        br
        button.button-blue(@click="attemptLogin") Login
        p.error-message(v-if="loginErrorMessage != ''") {{loginErrorMessage}}

      // TODO: add this back once there's a create user page to reference
      //- p.subtext Don't have an account? 
      //-   // TODO: update href
      //-   a.subtext-link(href="https://github.com/nuxt/nuxt.js", target="_blank") Sign up

    // TODO: best for these to get moved to their own components
    .home-screen(v-else)
      .user-greeting
        h1.greeting Hello, {{loggedInUser}}!
      .user-info-display
        p.total-today-text Today's total: {{totalToday}}

      .user-logout
        button.button-blue(@click="logout") Logout
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
      loginErrorMessage: '',
      loggedInUser: '', // TODO: change this when Firebase auth is up and going
      drinkLogs: [  // TODO: pull this from server
        { time: "", amount: 7.5 },
        { time: "", amount: 16 },
        { time: "", amount: 12 },
      ]
    }
  },
  computed: {
    totalToday: function () {
      return this.drinkLogs.reduce((total, drinklog) => {
        return total + drinklog.amount;
      }, 0);
    }
  },
  components: {
    Logo
  },
  methods: {
    attemptLogin: function (event) {
      // TODO: make validation logic depend on an actual authentication call
      // For now, this just says invalid when supposed email address is missing an @ symbol
      if (this.userEmail.includes("@")) {
        this.loggedInUser = this.userEmail;
        this.loginErrorMessage = '';

        // simulate login success for now
        this.userEmail = '';
        this.userPassword = '';
      } else {
        this.loginErrorMessage = 'Invalid email or password.';
      }
    },
    logout: function(event) {
      this.loggedInUser = '';
    }
  },
}
</script>

<style lang="sass">
.container
  margin: 0 auto
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: center
  text-align: center

$basic-text-color: #35495e

%text-shared
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
  display: block
  font-weight: 300
  letter-spacing: 1px

=text-mixin($color, $font-size)
  @extend %text-shared
  color: $color
  font-size: $font-size

.login-screen
  .logo-title
    padding-bottom: 20px

    .title
      +text-mixin($basic-text-color, 100px)

  .login-console
    .login-field
      display: inline-block
      border-radius: 4px
      border: 1px solid gray
      color: gray
      text-decoration: none
      padding: 10px 30px
      margin: 0px 0px 10px 0px
      width: 300px

    .error-message
      +text-mixin(indianred, 18px)
      padding-top: 10px

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

// .subtext
//   font-weight: 300
//   font-size: 20px
//   color: #526488
//   word-spacing: 2px
//   padding-bottom: 15px
//   padding: 10px

// .subtext-link
//   font-weight: 300
//   font-size: 20px
//   color: #6284ee
//   word-spacing: 2px
//   padding-bottom: 15px
</style>
