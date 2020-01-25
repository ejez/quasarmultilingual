import { Cookies } from 'quasar'
import params from 'src/params'

async function getRoutes (ssrContext) {
  // cookies plugin
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext) // when on server
    : Cookies // when on client

  const layoutRoutesAr = await import('./ar/layout-routes')
  const layoutRoutesEn = await import('./en/layout-routes')

  const routes = [
    // main route
    {
      path: '/',
      // redirect root path to language prefix (ex: '/ar'). the language is
      // obtained from a cookie if existing, otherwise default app language
      redirect: `/${cookies.get('app_lang') || params.defaultLang}`
    },

    // layout routes
    // (if needed you can use different layouts for different languages)
    {
      path: '/ar',
      component: () => import('layouts/MyLayout.vue'),
      children: layoutRoutesAr.default
    },
    {
      path: '/en',
      component: () => import('layouts/MyLayout.vue'),
      children: layoutRoutesEn.default
    }
  ]

  // Always leave this as last one
  if (process.env.MODE !== 'ssr') {
    routes.push({
      path: '*',
      name: 'error404',
      component: () => import('pages/Error404.vue')
    })
  }

  return routes
}

export default getRoutes
