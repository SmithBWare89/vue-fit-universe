<template>
<!-- Conditionally show the navigation bar if they're authorized -->
  <div v-if="user">
    <NavBar />
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
import { provide } from '@vue/runtime-core'
import store from './store/index'
import Dashboard from './views/Dashboard.vue'
import NavBar from './components/NavBar.vue'
import getUser from './composables/getUser'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: { Dashboard, NavBar, Loading }, 
  setup() {
    const { user } = getUser()
    provide('store', store)
    const appStore = store
    return { user, appStore }
  }
}
</script>

<style>

</style>
