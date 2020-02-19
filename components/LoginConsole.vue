<template lang="pug">
  .login-console
    input.login-field(v-model="userEmail", type="text", placeholder="Email")
    br
    input.login-field(v-model="userPassword", type="password", placeholder="Password")
    br
    button.button-blue(@click="submitLogin") Login
    p.error-message(v-if="errorMessage != ''") {{errorMessage}}
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      userPassword: '',
    }
  },
  props: ['errorMessage'],
  methods: {
    submitLogin: function (event) {
      this.$emit('submit', this.userEmail, this.userPassword)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/shared-text.sass'

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
</style>