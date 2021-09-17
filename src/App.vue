<template>
<!-- Conditionally show the navigation bar if they're authorized -->
  <div v-if="user">
    <span v-if="showNav">
      <NavBar />
    </span>
    <div v-if="appStore.navbar.state.isPending">
      <Loading />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script>
import { provide, ref, watchEffect } from '@vue/runtime-core'
import store from './store/index'
import Dashboard from './views/Dashboard.vue'
import NavBar from './components/NavBar.vue'
import getUser from './composables/getUser'
import Loading from './components/Loading.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: { Dashboard, NavBar, Loading }, 
  setup() {
    const { user } = getUser()
    const route = useRoute()
    const showNav = ref(false)
    provide('store', store)
    const appStore = store

    watchEffect(() => {
      if (route.path === '/' || route.path === '/login' || route.path === '/signup') {
        showNav.value = false
      } else {
        showNav.value = true
      }
    }, route.path)

    return { user, appStore, showNav }
  }
}
</script>

<style>

</style>
