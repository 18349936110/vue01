import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register')
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/Index')
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: () => import('@/views/ResetPassword')
  },

]
const router = new VueRouter({
  mode:"history",
  routes
})

export default  router
