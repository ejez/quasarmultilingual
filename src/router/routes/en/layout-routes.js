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
    path: 'about-us',
    component: () => import('pages/About.vue'),
    meta: commonMetas.about
  }
]
