<script>
import axios from '~/lib/axios'
import moment from 'moment'

const emptySecret = { name: '', value: '', loading: false, edit: false, error: false }
const formatSecret = s => ({ 
  ...s, 
  edit: false,
  newName: s.name,
  createdAt: moment(s.created),
  deleting: false
})

export default {
  data () {
    return { 
      secrets: [], 
      modal: false,
      newSecret: { ...emptySecret }
    }
  },
  async mounted () {
    const secrets = (await axios.get('/api/secrets')).data
    this.secrets = secrets
      .map(s => formatSecret(s))
      .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
  },
  computed: {
    editMode () {
      return this.secrets.some(s => s.edit)
    }
  },
  methods: { 
    reset (id) {
      const i = this.secrets.findIndex(s => s.uid == id)
      this.secrets.splice(i, 1, formatSecret(this.secrets[i]))
    },
    async rename (id) {
      const i = this.secrets.findIndex(s => s.uid == id)
      const secret = this.secrets[i]
      if (secret.name === '') return
      this.secrets[i].loading = true
      try {
        await axios.post(`/api/secrets/${id}`, { name: secret.newName })
        this.secrets.splice(i, 1, formatSecret({ ...secret, name: secret.newName }))
      } catch (err) {
        this.reset(id)
      }
      this.secrets[i].loading = false
    },
    async del (id) {
      const i = this.secrets.findIndex(s => s.uid == id)
      const secret = this.secrets[i]
      try {
        secret.deleting = true
        await axios.delete(`/api/secrets/${id}`)
        this.secrets.splice(i, 1)
      } catch (err) {
        this.reset(id)
      }
    },
    async create (name, value) {
      try {
        this.newSecret.loading = true
        const { data: { uid } } = await axios.post('/api/secrets', this.newSecret) 
        this.newSecret = { ...emptySecret }
        this.secrets.unshift(formatSecret({
          ...this.newSecret,
          id: uid,
          created: moment()
        }))
      } catch (err) {
        this.newSecret.error = true
        this.newSecret.loading = false
      }
    }
  }
}
</script>
<template lang="pug">
ul
  li(v-if="secrets.length === 0").has-text-centered
    span#loader Loading...
  template(v-for="secret in secrets")
    li(v-if="secret.edit", key="secret.uid").columns.is-mobile
      .column.is-12.control.is-grouped.is-grouped-right
        .control.is-expanded
          input(type="text", :value="secret.name", v-model="secret.newName").input
        .control
          a.button.is-primary.is-outlined(@click="rename(secret.uid)", :class="{ 'is-loading': secret.loading, 'is-disabled': secret.deleting }") Save
        .control
          a.button.is-danger.is-outlined(:class="{ 'is-disabled': secret.loading, 'is-loading': secret.deleting }", @click="del(secret.uid)") Delete
        .control
          a.button(@click="reset(secret.uid)", :class="{ 'is-disabled': secret.loading || secret.deleting }") Cancel
    li.columns.is-mobile(v-else, :class="{ edit: editMode }", key="secret.uid")
      .column.is-one-half-mobile.is-2-tablet {{ secret.name }}
      .column.is-one-quarter-mobile.is-8-tablet.faded.is-hidden-mobile.is-8-desktop {{ secret.createdAt.fromNow() }}
      .column.is-one-quarter-mobile.is-2-tablet.control.is-grouped.is-grouped-right
        .control
          a.button(@click="secret.edit = true") Edit
  li.columns.is-mobile(v-if="newSecret.edit")
    .column.is-12.control.is-grouped.is-grouped-right
      .control.is-expanded
        input(type="text", v-model="newSecret.name", placeholder="Name", :class="{ 'is-danger': newSecret.error }").input
      .control.is-expanded
        input(type="text", v-model="newSecret.value", placeholder="Value", :class="{ 'is-danger': newSecret.error }").input
      .control
        a.button(@click="newSecret.edit = false", :class="{ 'is-disabled': newSecret.loading }") Cancel
      .control
        a.button.is-primary.is-outlined(@click="create", :class="{ 'is-loading': newSecret.loading }") Create
  li.level(v-else)
    .level-left
        a.button.is-outlined.level-item(@click="newSecret.edit = true") New secret
    .level-right
      a.button.is-link.level-item(@click="modal=true")
        span(class="icon is-small")
          i(class="fa fa-question")
        span Help using secrets
  .modal(:class="{ 'is-active': modal }")
    .modal-background
    .modal-card
      header.modal-card-head
        p.modal-card-title Using Secrets
      .modal-card-body
        slot
      footer.modal-card-foot.has-text-right
        button.button(@click="modal=false") Done
    button(class="modal-close", @click="modal=false")

</template>
<style lang="sass" scoped>
@import '~bulma/sass/utilities/variables'
@import '~bulma/sass/utilities/mixins'

#loader
  display: inline-block
  position: relative
  &::before
    +loader
    position: absolute
    left: -30px
    top: 50%
    margin-top: -.5em

ul
  margin-bottom: 30px

.faded
  color: $grey-light

.edit
  opacity: .5

.is-grouped-right
  justify-content: flex-end
</style>
