<template>
    <NavBar />
    <div class="app-content">
        <!-- App Components Will Go here -->
        <Feed />
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Feed from '../components/Feed.vue'
export default {
    name: 'Dashboard',
    components: { NavBar, Feed }
}
</script>

<style>

</style>