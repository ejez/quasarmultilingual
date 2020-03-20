import appLanguages from 'src/i18n/app-languages.json'

// to avoid importing the same language pack multiple times,
// we use this to hold loaded language packs for future use
const loadedQLangPacks = {}

// async function that lazily loads a quasar language pack of the provided language.
export default async function ({ appLang, quasar }) {
  // check if the provided language is different from current quasar language
  if (appLang !== quasar.lang.isoName) {
    try {
      // if the app language isoName (ex: 'en') is different from its
      // corresponding quasar language pack name (ex: 'en-us'), indicate that
      // in 'app-languages.json' using the key 'quasarLanguage'.
      // if this key is not defined, the isoName is used instead to locate the
      // quasar language pack inside 'node_modules/quasar/lang/' (make sure it exists)
      const appLangObj = appLanguages.find(langObj => langObj.isoName === appLang)
      const quasarLang = appLangObj.quasarLanguage || appLang

      // check if the quasar language pack was not already imported
      if (!Object.keys(loadedQLangPacks).includes(appLang)) {
        // import quasar language pack
        const qLangPack = await import(
          // important: edit listed languages in the following webpack magic
          // comment according to needed quasar language packs
          /* webpackInclude: /(ar|en-us)\.js$/ */
          `quasar/lang/${quasarLang}`
        )

        // update retrieved lang pack with values defined in 'app-languages.json'
        qLangPack.default.isoName = appLangObj.isoName
        qLangPack.default.nativeName = appLangObj.nativeName

        // add retrieved lang pack to loaded packs list, this way in the next
        // runs of this function we do not import it again
        loadedQLangPacks[appLang] = qLangPack.default
      }

      // set quasar language
      quasar.lang.set(loadedQLangPacks[appLang])
    } catch (error) {
      console.error('Error loading quasar language pack:', error)
    }
  }
}
