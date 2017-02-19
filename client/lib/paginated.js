import debounce from 'debounce'
import axios from '~/lib/axios'
import Pagination from '~/components/pagination'

export default {
  data (x) {
    return {
      pages: { prev: false, next: false },
      page: 1,
      loading: false
    }
  },
  mounted () { this.update() },
  methods: {
    update: debounce(async function ({ reset = false } = {}) {
      this.loading = true
      const repos = await axios.get(this.url, { 
        ...this.params, 
        page: reset ? 1 : this.page 
      })
      this.loading = false
      this.repos = repos.data
      this.pages = {
        next: !!repos.headers['x-next-page'],
        prev: !!repos.headers['x-prev-page']
      }
    }, 200),
    prev () {
      this.page--
      this.pages.prev = 'loading'
    },
    next () {
      this.page++
      this.pages.next = 'loading'
    }
  },
  components: { Pagination }
}
