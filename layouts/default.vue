<script>
import NavBar from '~components/nav'

export default {
  components: { NavBar }
}
</script>

<template lang="pug">
div
  nav-bar(v-if="$route.path !== '/'")
  nuxt
</template>

<style lang="sass">
</style>
