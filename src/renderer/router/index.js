import Vue from 'vue'
import Router from 'vue-router'
import storage from 'store'
import Home from '@/components/Page/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
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
          path: '/auth/forgetPassword',
          name: 'ForgetPassword',
          component: resolve => require(['@/components/Page/ForgetPassword'], resolve)
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
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = storage.get('accessToken')
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
