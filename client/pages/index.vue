<script>
export default {
  fetch ({ store, redirect }) {
    if (store.state.user.loggedIn === false) redirect('/login')
  }
}
</script>

<template lang="pug">
nuxt-child
</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'

#error
  color: $danger
  margin-top: 20px
</style>
