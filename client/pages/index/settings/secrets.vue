<script>
import { highlightBlock } from 'highlight.js'

export default {
  mounted () {
    const codes = this.$el.querySelectorAll('pre')
    for (let code of codes) {
      highlightBlock(code)
    }
  }
}
</script>

<template lang="pug">
section.section
  .container
    p To get environment variables injected into your builds, use Now's built in secrets system. Here's a brief walkthrough:
    ul
      li.columns
        .column
          h2.subtitle.is-4 1. Add your secrets to Now
          p Take a look <a href="https://zeit.co/blog/environment-variables-secrets">here</a> for more info.
        .column
          pre: code.bash $ now secret add your_secret_name your-secret-value
      li.columns
        .column
          h2.subtitle.is-4 2. Add the secrets to your package.json
          p Notice the use of @ to indicate you are using the name of an existing secret.
        .column
          pre: code.json.
            # package.json
            {
              "now": {
                "secrets": {
                  "YOUR_ENV_VAR": "@your_secret_name"
                }
              }
            }
      li.columns
        .column
          h2.subtitle.is-4 3. Use the env var in your application
          p Your env vars will be named whatever you named them in step 2.
        .column
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

.container > p
  margin-bottom: 50px

li.columns
  margin-bottom: 30px

pre
  background-color: $white-bis
</style>
