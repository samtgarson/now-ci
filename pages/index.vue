<script>
import NavBar from '~components/nav'

export default {
  components: { NavBar }
}
</script>

<template lang="pug">
div
  .hero.is-medium
    .hero-body
      .container.has-text-centered
        h1.title.is-6 Log in to get started
        a.button.is-large(href="/auth")
          span(class="icon is-medium")
            i(class="fa fa-github")
          span Log in with Github
</template>

<style scoped lang="sass">

</style>
