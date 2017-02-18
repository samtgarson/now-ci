<script>
import { mapState } from 'vuex'
import debounce from 'debounce'
import axios from '~/lib/axios'
import Repo from '~/components/repo'

export default {
  data ({ store }) {
    return {
      selected: store.state.user.login,
      repos: [],
      pages: { prev: false, next: false },
      page: 1,
      query: '',
      loading: false
    }
  },
  computed: {
    ...mapState(['user']),
    orgs () {
      return [this.user.login, ...this.user.orgs]
    }
  },
  mounted () { this.update() },
  watch: {
    page () { this.update() },
    query () { 
      this.page = 1
      this.update()
    },
    selected () { 
      this.page = 1
      this.update()
    }
  },
  methods: {
    update: debounce(async function () {
      const params = { page: this.page, query: this.query }
      if (this.selected !== this.$store.state.user.login) params.org = this.selected
      this.loading = true
      const repos = await axios.get('/api/repos', { params })
      this.loading = false
      this.repos = repos.data
      this.pages = {
        next: !!repos.headers['x-next-page'],
        prev: !!repos.headers['x-prev-page']
      }
    }, 200)
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
        .pagination(v-if="pages.next || pages.prev")
          a.button(:class="{ 'is-disabled': !pages.prev, 'is-loading': pages.prev == 'loading' }", @click="page--; pages.prev = 'loading'") Previous Page
          a.button(:class="{ 'is-disabled': !pages.next, 'is-loading': pages.next == 'loading' }", @click="page++; pages.next = 'loading'") Next Page

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

.pagination
  margin-top: 30px
  justify-content: flex-end

  a
    margin-left: 5px

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
