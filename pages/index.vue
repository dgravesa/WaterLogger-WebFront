<template lang="pug">
  .container
    div(v-if="loggedInUser == ''")
      Logo
      h1.title WaterLogger

      input.login-field(v-model="userEmail", type="text", placeholder="Email")
      br
      input.login-field(v-model="userPassword", type="password", placeholder="Password")
      br
      button.button--grey(@click="attemptLogin") Login

      p.error-message(v-if="loginErrorMessage != ''") {{loginErrorMessage}}

      p.subtext Don't have an account? 
        // TODO: update href
        a.subtext-link(href="https://github.com/nuxt/nuxt.js", target="_blank") Sign up

    // TODO: best for these to get moved to their own components
    div(v-else)
      h1.title Hello, {{loggedInUser}}!
      p.subtext Today's total: {{totalToday}}
      button.button--grey(@click="logout") Logout
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  margin: 0px 0px 20px 0px;
}

.subtext {
  font-weight: 300;
  font-size: 20px;
  color: #526488;
  word-spacing: 2px;
  padding-bottom: 15px;
  padding: 10px;
}

.subtext-link {
  font-weight: 300;
  font-size: 20px;
  color: #6284ee;
  word-spacing: 2px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.login-field {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid gray;
  color: gray;
  text-decoration: none;
  padding: 10px 30px;
  margin: 0px 0px 10px 0px;
  width: 300px;
}

.error-message {
  font-weight: 300;
  font-size: 18px;
  color: indianred;
  word-spacing: 2px;
  padding-top: 10px;
}
</style>
