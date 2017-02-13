<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    orgs () {
      return [this.user.login, ...this.user.orgs]
    }
  }
}
</script>

<template lang="pug">
.section
  .container
    .columns
      .column.is-3
        .menu
          .menu-label Organisations
          ul.menu-list
            li(v-for="org in orgs"): a {{ org }}


</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'
</style>
