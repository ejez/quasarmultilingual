import Vue from 'vue'
import VueRouter from 'vue-router'
import { Quasar, Cookies } from 'quasar'
import getRoutes from './routes/routes'
import setAppLanguage from 'src/i18n/set-app-language'
import { i18n } from 'boot/i18n'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default async function ({ ssrContext }) {
  const routes = await getRoutes(ssrContext)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  Router.beforeEach((to, from, next) => {
    const toLang = to.path.split('/')[1]
    setAppLanguage({ toLang, quasar: Quasar, i18n, cookies, routeMeta: to.meta })
      .then(() => next())
  })

  return Router
}
