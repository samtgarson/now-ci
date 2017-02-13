<script>
export default {
  fetch ({ store, redirect }) {
    if (store.state.user.loggedIn === true) redirect('/')
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
div
  .hero.is-medium
    .hero-body
      .container.has-text-centered
        h1.title.is-5 Log in to get started
        a.button.is-large(href="/auth")
          span(class="icon is-medium")
            i(class="fa fa-github")
          span Log in with Github
        h2.subtitle.is-6#error(v-if="error") Something went wrong, please try again.
</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'

#error
  color: $danger
  margin-top: 20px
</style>
