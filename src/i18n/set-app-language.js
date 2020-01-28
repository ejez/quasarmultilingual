import appLanguages from 'src/i18n/app-languages.json'
import loadQLangPack from 'src/i18n/load-quasar-lang-pack.js'
import loadI18nMsgObj from 'src/i18n/load-i18n-msg-obj'

const appLanguagesIsoNames = appLanguages.map(langObj => langObj.isoName)

// function that sets a provided language 'toLang' to Quasar and
// vue-i18n instance. It also sets/updates a language cookie
export default async function ({ toLang, quasar, i18n, cookies, routeMeta = {} }) {
  try {
    // check if the provided language is one of the app languages
    if (appLanguagesIsoNames.includes(toLang)) {
      // load a quasar language pack
      loadQLangPack({ appLang: toLang, quasar })

      // set or update 'app_lang' cookie
      cookies.set('app_lang', toLang, { expires: 365, path: '/' })

      // check if vue-i18n common messages object of the target language was not
      // already loaded
      if (!Object.keys(i18n.messages).includes(toLang)) {
        // import vue-i18n common messages object
        const vueI18nMessage = await import(
          // important: edit listed languages in the following webpack magic
          // comment according to your app languages
          /* webpackInclude: /(ar|en)\/index\.js$/ */
          `src/i18n/vue-i18n-messages/${toLang}`
        )
        i18n.setLocaleMessage(toLang, vueI18nMessage.default)
      }

      // if additional i18n translations for a particular route are needed,
      // we load them here
      if (routeMeta.i18nMessage) {
        await loadI18nMsgObj({ locale: toLang, msgPath: routeMeta.i18nMessage, i18n })
      }

      // after all needed vue-i18n messages are loaded and ready we set/change
      //  vue-i18n locale
      i18n.locale = toLang
    }
  } catch (err) {
    console.error('Error setting the app language:', err)
  }
}
