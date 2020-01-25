import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Quasar, Cookies } from 'quasar'
import params from 'src/params'
import setAppLanguage from 'src/i18n/set-app-language'
import appLanguages from 'src/i18n/app-languages.json'

Vue.use(VueI18n)

// create vue-i18n instance
const i18n = new VueI18n({
  fallbackLocale: params.defaultLang
})

const appLanguagesIsoNames = appLanguages.map(lang => lang.isoName)

export default ({ app, ssrContext }) => {
  // get request url
  const url = process.env.SERVER
    ? ssrContext.url
    : window.location.pathname

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  // here we initialize our app with the appropriate language, the language is
  // obtained from the request url language prefix. If no prefix we use a cookie
  // if it was previously set. if no language cookie we fall back to the app
  // default language.
  let toLang = ''
  if (appLanguagesIsoNames.includes(url.split('/')[1])) {
    toLang = url.split('/')[1]
  } else {
    toLang = cookies.has('app_lang')
      ? cookies.get('app_lang')
      : params.defaultLang
  }

  setAppLanguage({ toLang, quasar: Quasar, i18n, cookies })

  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
