<template lang="pug">
  .login-console
    input.text-input-box(v-model="userEmail", type="text", placeholder="Email")
    br
    input.text-input-box(v-model="userPassword", type="password", placeholder="Password")
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
@import '~/assets/shared-input.sass'

.login-console
  .text-input-box
    +text-input-mixin(300px)
  .error-message
    +text-mixin($error-text-color, 18px)
    padding-top: 10px
</style>