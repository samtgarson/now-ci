<script>
import axios from '~/lib/axios'

export default {
  data () {
    return { builds: [] }
  },
  mounted () {

  },
  methods: {
    update () {

    }
  }
}
</script>

<template lang="pug">
div
  .hero
    .hero-body
      .container
        h1.title Builds
  .section
    .container
</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'
</style>
