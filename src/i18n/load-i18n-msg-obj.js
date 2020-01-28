// to avoid importing the same vue-i18n message object multiple times,
// we use this variable to hold loaded message objects for future use
let loadedI18nMsgObjs = {}

// async function that lazily loads i18n messages of the provided locale.

// Note: because this function has async calls, these calls will be run
// after components rendering, as a consequence the i18n messages might not be
// available on initial rendering which will cause vue-i18n to complain that
// the translation is not available. The vue-i18n console warning should be
// regarded as normal and intentional.
// if you still want to wait for messages to be loaded before component rendering
// (and avoid vue-i18n warnings) take a look at workarounds here:
// https://github.com/vuejs/vue/issues/7209
export default async function ({ locale, msgPath, i18n }) {
  try {
    // path of the vue-i18n message object inside 'src/i18n/vue-i18n-messages'
    const msgFullPath = `${locale}/${msgPath}`

    // check if the vue-i18n message object was not already imported
    if (!Object.keys(loadedI18nMsgObjs).includes(msgFullPath)) {
      // import vue-i18n message object
      const vueI18nMsgObj = await import(
        // important: edit listed languages in the following webpack magic
        // comment according to your app languages
        /* webpackInclude: /(ar|en)\/.+\/index\.js$/ */
        `src/i18n/vue-i18n-messages/${msgFullPath}`
      )

      // add retrieved message object to loaded objects list, this way
      // in the next runs of this function we do not import it again
      loadedI18nMsgObjs[msgFullPath] = vueI18nMsgObj.default

      // merge retrieved messages with previously loaded messages (coming
      // from app common messages or other route or component messages)
      i18n.mergeLocaleMessage(locale, loadedI18nMsgObjs[msgFullPath])
    }
  } catch (error) {
    console.error('Error loading vue-i18n messages:', error)
  }
}
