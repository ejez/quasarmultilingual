<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    option-value="isoName"
    option-label="nativeName"
    options-dense
    style="min-width: 100px"
  />
</template>

<script>
import appLanguages from 'src/i18n/app-languages.json'

export default {
  name: 'QmLangSelector',

  computed: {
    // active selector language
    lang: {
      // active selector language is obtained from quasar active language
      get: function () {
        return appLanguages.find(lang => lang.isoName === this.$q.lang.isoName)
      },

      // when the selector language changes, we check if there is a corresponding
      // path in the new language and redirect to it, if not we redirect to the
      // home page of the new language.
      // The router afterwards will update quasar and vue-i18n languages.
      set: function (targetLang) {
        if (targetLang.isoName !== this.lang.isoName) {
          const translationPath = this.$route.meta.translations
            ? this.$route.meta.translations[targetLang.isoName]
            : null

          const targetPath = translationPath
            ? `/${targetLang.isoName}/${translationPath}`
            : `/${targetLang.isoName}`

          this.$router.push(targetPath)
        }
      }
    }
  },

  created () {
    // initialize selector options with app languages
    this.langOptions = appLanguages
  }
}
</script>
