import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
import '../assets/css/global.css'
import '../assets/fonts/iconfont.css'
import axios from 'axios'
/* 配置请求的根路径 */
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
Vue.prototype.$http = axios

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

/* 挂在路由导航守卫 */
router.beforeEach((to, from, next) => {
  /* to 将要访问的路径  from 代表从哪个路径跳转而来 next 是一个函数，表示放行  next() 放行 next('/login') 强制跳转 */
  if (to.path === '/login') return next()
  /* 获取token */
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
