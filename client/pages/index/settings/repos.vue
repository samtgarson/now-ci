<script>
import { mapState } from 'vuex'
import Repo from '~/components/repo'
import paginated from '~/lib/paginated'

export default {
  data ({ store }) {
    return {
      selected: store.state.user.login,
      repos: [],
      query: '',
      url: '/api/repos'
    }
  },
  mixins: [paginated],
  computed: {
    ...mapState(['user']),
    orgs () {
      return [this.user.login, ...this.user.orgs]
    },
    params () {
      const params = { query: this.query }
      if (this.selected !== this.$store.state.user.login) params.org = this.selected
    }
  },
  watch: {
    page () { this.update() },
    query () { 
      this.update({ reset: true })
    },
    selected () { 
      this.update({ reset: true })
    }
  },
  components: { Repo }
}
</script>

<template lang="pug">
.section(:class="{ loading }")
  .container
    .columns
      .column.is-3
        .menu
          .control.has-icon.has-icon-right
            .clear-search(@click.capture="query = ''")
            span.icon.is-small
              i.fa(:class="'fa-' + (this.query ? 'times' : 'search')")
            input.input.is-expanded(placeholder="Search", v-model.trim="query")
          .menu-label Organisations
          ul.menu-list
            li(v-for="org in orgs")
              a(@click="selected=org", :class="{'is-active': selected===org}") {{ org }}
      .column.is-9
        ul#repos
          repo(v-for="repo in repos", :repo="repo")
          li(v-if="!repos.length && !loading").has-text-centered No results... 😧
        pagination(pages="pages", next="next", prev="prev")

</template>

<style scoped lang="sass">
@import '~bulma/sass/utilities/variables'
@import '~bulma/sass/utilities/mixins'

.loading .menu a.is-active
  position: relative

  &::after
    +loader
    content: ''
    position: absolute
    right: 8px
    top: 50%
    margin-top: -8px

.control
  margin-bottom: 30px

.clear-search
  position: absolute
  right: 0
  top: 0
  bottom: 0
  width: 50px
  z-index: 1

.level
  align-items: baseline

.level-left
  display: flex

// +mobile
//   .level-right,
//   .level-left,
//   .level-item
//     margin: auto 0

</style>
