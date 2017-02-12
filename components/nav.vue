<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['user'])
}
</script>
<template lang="pug">
.nav
  .container
    .nav-left 
      h1.nav-item: nuxt-link(to="/") Now CI
      a.nav-item(href="https://github.com/samtgarson/now-ci")
        span(class="icon is-small")
          i(class="fa fa-github")
    .nav-right(v-if="user.loggedIn")
      .nav-item.is-tab: nuxt-link(to="/builds") Builds
      .nav-item.is-tab: nuxt-link(to="/settings") Settings
      .nav-item
          a.button Logout
      .nav-item
        img#avatar.image.is-24x24(:src="user.avatar_url")
</template>
<style lang="sass" scoped>
@import '~bulma/sass/utilities/variables'

.nav
  box-shadow: 0 1px 0 rgba($grey-lighter, .3)

#avatar
  border-radius: 24px
</style>
