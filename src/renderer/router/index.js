import Vue from 'vue'
import Router from 'vue-router'
import * as Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Page/Home'], resolve),
      meta: { requiresAuth: true },
      redirect: '/map/make',
      children: [
        {
          path: '/account',
          name: 'Account',
          component: resolve => require(['@/components/Page/Account'], resolve)
        }, {
          path: '/map',
          name: 'Map',
          component: resolve => require(['@/components/Page/Map'], resolve),
          children: [
            {
              path: '/map/make',
              name: 'Map-make',
              component: resolve => require(['@/components/Page/Map/Make'], resolve)
            }
          ]
        }
      ]
    }, {
      path: '/auth',
      name: 'Auth',
      component: resolve => require(['@/components/Page/Auth'], resolve),
      children: [
        {
          path: '/auth/login',
          name: 'Login',
          component: resolve => require(['@/components/Page/Login'], resolve)
        }, {
          path: '/auth/register',
          name: 'Register',
          component: resolve => require(['@/components/Page/Register'], resolve)
        }, {
          path: '/auth/reset',
          name: 'Reset',
          component: resolve => require(['@/components/Page/Reset'], resolve)
        }
      ]
    }, {
      path: '/chart',
      name: 'Chart',
      component: resolve => require(['@/components/Page/Chart'], resolve)
    }, {
      path: '/myProject',
      name: 'MyProject',
      component: resolve => require(['@/components/Page/MyProject'], resolve)
    }, {
      path: '/map',
      name: 'Map',
      component: resolve => require(['@/components/Page/Map'], resolve)
    }, {
      path: '/help',
      name: 'Help',
      component: resolve => require(['@/components/Page/Help'], resolve)
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = Cookies.get('ACCESSTOKEN')

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
