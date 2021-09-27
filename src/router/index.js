import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from '../firebase/config'
import Home from '../views/Home.vue'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  // Grab the current user
  if(!user) {
    next({name: 'Home'})
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  // Grab the current user
  if(user) {
    next({name: 'Dashboard'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireNoAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: requireNoAuth
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue'),
    beforeEnter: requireNoAuth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/workout',
    name: 'Workout',
    component: () => import(/* webpackChunkName: "Workout" */ '../views/Workout.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
