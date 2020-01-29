<template>
  <q-page>
    <div>{{ $t('About') }}</div>
    <div>{{ $t('Learn more') }}</div>
  </q-page>
</template>

<script>
import i18nMixin from 'src/i18n/i18n-mixin.js'

export default {
  mixins: [i18nMixin],
  data () { return { i18nMsgPath: 'pages/about' } }
}
</script>
