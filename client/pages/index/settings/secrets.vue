<script>
import { highlightBlock } from 'highlight.js'
import SecretsForm from '~components/secrets-form'

export default {
  mounted () {
    const codes = this.$el.querySelectorAll('pre')
    console.log(codes)
    for (let code of codes) {
      highlightBlock(code)
    }
  },
  components: { SecretsForm }
}
</script>

<template lang="pug">
section.section
  .container
    secrets-form
      p#intro To get environment variables injected into your builds, use Now's built in secrets system. Here's a brief walkthrough:
      ul
        li
          h2.subtitle.is-4 1. Add your secrets to Now
          p Either use the the form on Now CI, or use the command line (take a look <a href="https://zeit.co/blog/environment-variables-secrets">here</a> for more info).
          pre: code.bash $ now secret add your_secret_name your-secret-value
        li
          h2.subtitle.is-4 2. Add the secrets to your package.json
          p Notice the use of @ to indicate you are using the name of an existing secret.
          pre: code.json.
            # package.json
            {
              "now": {
                "secrets": {
                  "YOUR_ENV_VAR": "@your_secret_name"
                }
              }
            }
        li
          h2.subtitle.is-4 3. Use the env var in your application
          p Now CI will use your package.json config to automagically inject your env vars (they will be named whatever you named them in step 2).
          pre: code.js.
            # index.js 
            const varName = process.env['YOUR_ENV_VAR']
</template>

<style scoped lang="sass">
@import '~highlight.js/styles/github-gist.css'
@import '~bulma/sass/utilities/variables'

a
  position: relative
  &::after
    content: ''
    position: absolute
    left: 0
    right: 0
    bottom: -2px
    height: 1px
    background-color: rgba($text, 0.4)

  &:hover::after
    background-color: $text

#intro
  margin-bottom: 40px

li
  margin-bottom: 40px

pre
  background-color: $white-bis
  margin-top: 20px
</style>
