import appLanguages from 'src/i18n/app-languages.json'

const appLanguagesIsoNames = appLanguages.map(lang => lang.isoName)

// to avoid importing the same language pack multiple times, we use this
// variable to hold loaded language packs for future use
let loadedQLangPacks = {}

// function that sets a provided language 'toLang' to Quasar and
// vue-i18n instance. It also sets/updates a language cookie
export default async function ({ toLang, quasar, i18n, cookies }) {
  if (
    // check if the provided language is one of the app languages
    appLanguagesIsoNames.includes(toLang) &&
    // check if the provided language is different from current app language
    (toLang !== quasar.lang.isoName || toLang !== i18n.locale)
  ) {
    try {
      // if the app language isoName (ex: 'en') is different from its
      // corresponding quasar language pack name (ex: 'en-us'), indicate that
      // in 'app-languages.json' using the key 'quasarLanguage'.
      // if this key is not defined, the isoName is used instead to locate the
      // quasar language pack inside 'node_modules/quasar/lang/' (make sure it exists)
      const toLangObj = appLanguages.find(lang => lang.isoName === toLang)
      const quasarLang = toLangObj.quasarLanguage || toLang

      if (!Object.keys(loadedQLangPacks).includes(toLang)) {
        // import quasar language pack
        const qLangPack = await import(
          /* webpackInclude: /(ar|en-us)\.js$/ */
          `quasar/lang/${quasarLang}`
        )

        // update retrieved lang pack with values defined in 'app-languages.json'
        qLangPack.default.isoName = toLang
        qLangPack.default.nativeName = toLangObj.nativeName

        // add retrieved lang pack to loaded packs list, this way in the next
        // runs of this function we do not import it again
        loadedQLangPacks[toLang] = qLangPack.default
      }

      // set quasar language
      quasar.lang.set(loadedQLangPacks[toLang])

      // set or update 'app_lang' cookie
      cookies.set('app_lang', toLang, {
        expires: 365,
        path: '/'
      })

      // check if i18n message object of the target language was already loaded
      if (!Object.keys(i18n.messages).includes(toLang)) {
        // import vue-i18n message object
        const vueI18nMessage = await import(
          /* webpackInclude: /(ar|en)\/index\.js$/ */
          `src/i18n/vue-i18n-messages/${toLang}`
        )
        i18n.setLocaleMessage(toLang, vueI18nMessage.default)
      }

      // set vue-i18n locale
      i18n.locale = toLang
    } catch (err) {
      console.error('Error setting the app language:', err)
    }
  }
}
