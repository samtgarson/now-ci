<script>
export default {
  props: {
    path: String,
    tag: {
      type: String,
      default: 'a'
    }
  }
}
</script>
<template lang="pug">
nuxt-link(:to="path", active-class="is-active", :exact="path == '/'", :tag="tag")
  slot
</template>
<style lang="sass" scoped>
</style>
