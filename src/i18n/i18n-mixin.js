import loadI18nMsgObj from 'src/i18n/load-i18n-msg-obj'

export default {
  computed: {
    // computed property that will be watched for app language changes and
    // triggering an on demand loading of corresponding i18n message object
    locale: function () { return this.$i18n.locale }
  },

  watch: {
    // when the app language changes load this component i18n messages
    locale: function (locale) {
      loadI18nMsgObj({ locale, msgPath: this.i18nMsgPath, i18n: this.$i18n })
    }
  },

  // when this component is created load this component i18n messages
  created: function () {
    loadI18nMsgObj({ locale: this.$i18n.locale, msgPath: this.i18nMsgPath, i18n: this.$i18n })
  }

  // Uncomment the following if you want component based localization
  // https://kazupon.github.io/vue-i18n/guide/component.html
  // in this case this.$i18n will refer to component VueI18n instance instead of
  // root instance
  // i18n: { messages: {} }
}
