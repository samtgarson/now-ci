<script>
import axios from '~/lib/axios'

export default {
  props: {
    repo: Object
  },
  data () {
    return  { loading: false }
  },
  methods: {
    async toggle () {
      const fn = this.repo.hooked ? this.unbuild : this.build
      this.loading = true
      await fn()
      this.loading = false
    },
    async build () {
      await axios.post(`/api/repos/${this.repo.owner.login}/${this.repo.name}/build`)
      this.repo.hooked = true
    },
    async unbuild() {
      await axios.delete(`/api/repos/${this.repo.owner.login}/${this.repo.name}/build`)
      this.repo.hooked = false
    }
  }
}
</script>
<template lang="pug">
li.level.is-mobile
  .level-left 
    span.level-item {{ repo.name }}
    a(:href="repo.html_url", target="_blank").level-item
      span.icon.is-small
        i.fa.fa-github
  .level-right
    .button.level-item(:class="{ 'is-success': repo.hooked, 'is-loading': loading }", @click="toggle(repo.id)") {{ repo.hooked ? 'Building' : 'Build' }}
</template>
<style lang="sass" scoped>
</style>
