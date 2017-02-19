<script>
import NavBar from '~components/nav'
export default {
  components: { NavBar }
}

</script>

<template lang="pug">
div
  nav-bar
  nuxt
</template>

<style lang="sass">
@import '~bulma/sass/utilities/variables'

.hero .tabs ul
  border-bottom: 1px solid $border
</style>
