<template>
<!-- Conditionally show the navigation bar if they're authorized -->
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import { onBeforeMount, onMounted, watchEffect } from '@vue/runtime-core'
export default {
  name: 'App',
  components: {NavBar}
}
</script>

<style>
</style>
