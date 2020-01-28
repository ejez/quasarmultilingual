<template>
  <q-page class="flex flex-center">
    <div>{{ $t('Welcome') }}</div>
  </q-page>
</template>

<script>
import i18nMixin from 'src/i18n/i18n-mixin.js'

export default {
  name: 'PageIndex',
  mixins: [i18nMixin],
  data () { return { i18nMsgPath: 'pages/index' } }
}
</script>
