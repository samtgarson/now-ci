<script>
import { mapState } from 'vuex'
import NavItem from './nav-item'

export default {
  computed: mapState(['user']),
  data () {
    return { open: false }
  },
  components: { NavItem }
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
    .nav-toggle(@click="open = !open")
      span
      span
      span
    .nav-right.nav-menu(v-if="user.loggedIn", :class="{ 'is-active': open }")
      nav-item.nav-item(path="/") Builds
      nav-item.nav-item(path="/settings") Settings
      .nav-item
          a.button(href="/logout") Logout

</template>
<style lang="sass" scoped>
@import '~bulma/sass/utilities/variables'

#avatar
  border-radius: 24px

</style>
