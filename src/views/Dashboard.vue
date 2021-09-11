<template>
    <NavBar />
    <div class="app-content">
        <!-- App Components Will Go here -->
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import { useRoute } from 'vue-router'
import { ref } from '@vue/reactivity'
export default {
    name: 'Dashboard',
    components: { NavBar }
}
</script>

<style>

</style>