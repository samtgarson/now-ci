<script>
export default {
  props: {
    next: Function,
    prev: Function,
    pages: Object
  }
}
</script>
<template lang="pug">
.pagination(v-if="pages.next || pages.prev")
  a.button(:class="{ 'is-disabled': !pages.prev, 'is-loading': pages.prev == 'loading' }", @click="prev") Previous Page
  a.button(:class="{ 'is-disabled': !pages.next, 'is-loading': pages.next == 'loading' }", @click="next") Next Page
</template>
<style lang="sass" scoped>
.pagination
  margin-top: 30px
  justify-content: flex-end

  a
    margin-left: 5px
</style>
