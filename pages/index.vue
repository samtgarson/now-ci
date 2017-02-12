<script>
export default {
  fetch ({ store, redirect }) {
    if (store.state.user.loggedIn === false) redirect('/login')
  },
  data () {
    return { error: false }
  },
  mounted () {
    if (location.search.indexOf('auth_error') >= 0) this.error = true
  }
}
</script>

<template lang="pug">
h1 Success!
</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'

#error
  color: $danger
  margin-top: 20px
</style>
