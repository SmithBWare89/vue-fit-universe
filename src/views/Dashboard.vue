<template>
    <div ref="dashboardContent">
        <NavBar props="dashboardContent"/>
        <div class="app-content">
            <!-- App Components Will Go here -->
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import NavBar from '../components/NavBar.vue'
export default {
    name: 'Dashboard',
    components: { NavBar },
    setup() {
        const dashboardContent = ref(null)

        return { dashboardContent }
    }
}
</script>

<style>

</style>