<script>
import { mapState } from 'vuex'
import axios from '~/lib/axios'
export default {
  data ({ store }) {
    return {
      selected: store.state.user.login,
      repos: [],
      pages: { prev: false, next: false },
      page: 1,
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
    selected () { 
      this.page = 1
      this.update()
    }
  },
  methods: {
    async update () {
      const params = { page: this.page }
      if (this.selected !== this.$store.state.user.login) params.org = this.selected
      this.loading = true
      const repos = await axios.get('/api/repos', {  params })
      this.loading = false
      this.repos = repos.data
      this.pages = {
        next: !!repos.headers['x-next-page'],
        prev: !!repos.headers['x-prev-page']
      }
    }
  }
}
</script>

<template lang="pug">
.section(:class="{ loading }")
  .container
    .columns
      .column.is-3
        .menu
          .menu-label Organisations
          ul.menu-list
            li(v-for="org in orgs")
              a(@click="selected=org", :class="{'is-active': selected===org}") {{ org }}
      .column.is-9
        ul#repos
          li(v-for="repo in repos").level
            .level-left 
              .level-item {{ repo.name }}
              a(:href="repo.html_url", target="_blank").level-item
                span(class="icon is-small")
                  i(class="fa fa-github")
            .level-right
              .button.level-item(:class="{ 'is-success': repo.hooked }") {{ repo.hooked ? 'Building' : 'Build' }}
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

</style>
