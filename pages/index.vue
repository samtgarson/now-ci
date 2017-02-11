<script>
import NavBar from '~components/nav'

export default {
  components: { NavBar }
}
</script>

<template lang="pug">
div
  .hero.is-medium
    .hero-head
      nav-bar
    .hero-body
      .container.has-text-centered
        a.button.is-large
          span(class="icon is-medium")
            i(class="fa fa-github")
          span Log in with Github
</template>

<style scoped lang="sass">

</style>
