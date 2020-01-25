import commonMetas from '../common-metas'

// children routes of main layout component (ie: page routes)
export default [
  // index page
  {
    path: '',
    component: () => import('pages/Index.vue'),
    meta: commonMetas.index
  },

  {
    path: 'من_نحن',
    // due to a bug in vue-router https://github.com/vuejs/vue-router/issues/3110
    // if you are using ssr please provide an alias to the path if it contains
    // non-ascii characters, the alias should be the encoded path value.
    alias: '%D9%85%D9%86_%D9%86%D8%AD%D9%86',
    component: () => import('pages/About.vue'),
    meta: commonMetas.about
  }
]
