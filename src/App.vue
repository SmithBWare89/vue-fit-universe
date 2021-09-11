<template>
<!-- Conditionally show the navigation bar if they're authorized -->
  <div id="app">
    <!-- <NavBar /> -->
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: { NavBar }
}
</script>

<style>
</style>
