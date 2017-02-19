<script>
export default {
  props: {
    builds: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<template lang="pug">
.build-list
    .build(v-for="build in builds")
      {{ build.sha }}
</template>
<style lang="sass" scoped>
</style>
