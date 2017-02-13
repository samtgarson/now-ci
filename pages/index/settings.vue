<script>
import NavItem from '~components/nav-item'
export default {
  components: { NavItem },
  fetch ({ redirect, route }) {
    if (route.path === '/settings') redirect('/settings/repos')
  }
}
</script>

<template lang="pug">
div
  .hero
    .hero-body
      .container
        h1.title Settings
    .hero-foot
      .container
        .tabs
          ul
            nav-item(path="/settings/repos", tag="li"): a Repos
            nav-item(path="/settings/secrets", tag="li"): a Secrets
  nuxt-child
</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'

.hero .tabs ul
  border-bottom: 1px solid $border
</style>
