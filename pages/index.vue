<template lang="pug">
  .container
    div
      Logo
      h1.title WaterLogger
      input.login-field(v-model="userEmail", type="text", placeholder="Email")
      br
      input.login-field(v-model="userPassword", type="password", placeholder="Password")
      br
      button.button--grey(@click="attemptLogin") Login
      p.subtext Don't have an account? 
        // TODO: update href
        a.subtext-link(href="https://github.com/nuxt/nuxt.js", target="_blank") Sign up
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
    }
  },
  components: {
    Logo
  },
  methods: {
    attemptLogin: function (event) {
      console.log("received login attempt:", this.userEmail, this.userPassword)
    },
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
</style>
