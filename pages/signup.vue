<template lang="pug">
  .container
    h1.greeting Sign up for WaterLogger
    input.text-input-box(v-model="userEmail", type="text", placeholder="Email")
    br
    input.text-input-box(v-model="confirmEmail", type="text", placeholder="Confirm Email")
    br
    input.text-input-box(v-model="userPassword", type="password", placeholder="Password")
    br
    input.text-input-box(v-model="confirmPassword", type="password", placeholder="Confirm Password")
    br

    .navigation
      button.button-blue(@click="submitSignup") Signup
      nuxt-link.login-link(to="/") Go to Login
    
    p.error-message(v-if="errorMessage != ''") {{errorMessage}}

</template>

<script>
export default {
  date() {
    return {
      userEmail: '',
      confirmEmail: '',
      userPassword: '',
      confirmPassword: '',
      errorMessage: '',
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/shared-text"
@import "~/assets/shared-container"
@import "~/assets/shared-input"

.container
  +container-mixin(100px)

  .greeting
    +text-mixin($basic-text-color, 64px)
    padding-bottom: 20px

  .navigation
    margin: 10px
    .login-link
      margin: 20px
      +link-mixin

  .error-message
    +text-mixin($error-text-color, 18px)
    padding-top: 10px
</style>