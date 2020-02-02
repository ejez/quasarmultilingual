# Multilingual Quasar

This project shows how to add multi-lingual support to your quasar projects.

To learn how it is achieved, please compare repository `master` with the initial tag `v0.1.0`:

https://github.com/ejez/quasarmultilingual/compare/v0.1.0..master

The added code is full of comments and explanations.

Demo [here](https://goofy-leakey-34b858.netlify.com)

## Features

- [vue-i18n](https://kazupon.github.io/vue-i18n/)

- SEO with [hreflang links](https://support.google.com/webmasters/answer/189077?hl=en)

- Lazy loading of quasar language packs and vue-i18n messages

- Multi-lingual routes (urls) using language prefix

- Auto-detection of app language from url language prefix or cookie (or fallback to default language)

- Language selector component

- If the language is changed using the language selector, a corresponding page translation will be shown if it exists in the target language.

- Ability to use a quasar language pack for a different language/locale, for example you can use quasar 'en-us' language pack for 'en' app language (you are not forced to use 'en-us' as an app language)

- ssr support
