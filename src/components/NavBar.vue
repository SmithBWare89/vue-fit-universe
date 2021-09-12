<template>
    <nav>
        <div class="nav-header">
            <h1>Fit Universe</h1>
        </div>
        <div class="nav-links">
            <span class="nav-icons">
                <i class="fas fa-user fa-3x"></i>
            </span>
            <span class="nav-icons">
                <i class="fas fa-home fa-3x"></i>
            </span>
            <span class="nav-icons">
                <i class="fas fa-dumbbell fa-3x"></i>
            </span>
            <span class="nav-icons">
                <i class="fas fa-music fa-3x"></i>
            </span>
            <span class="nav-icons">
                <i class="fas fa-shopping-cart fa-3x"></i>
            </span>
        </div>
        <div class="menu-hamburger">
            <i class="fas fa-bars"></i>
            <div v-if="">
                <SideNavigation props="navOpen"/>
            </div>
        </div>
    </nav>
    
</template>

<script>
import { ref } from '@vue/reactivity'
import SideNavigation from '../components/SideNavigation.vue'

export default {
    name: 'NavBar',
    components: { SideNavigation },
    setup() {
        const navOpen = ref(false)

        return { navOpen }
    }
}
</script>

<style scoped>

nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--beau);
    font-family: 'Fira Sans', sans-serif;
    padding-top: 5px;
    padding-bottom: 5px;
}

.nav-header {
    margin: 0px 0px 0px 10px;
}

.nav-header h1 {
    margin: 0;
    font-size: 40px;
}

.nav-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.nav-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    padding: 15px 15px;
}

.nav-icons:hover {
    color: var(--white);
    background: var(--pewter);
}

.menu-hamburger {
    display: none;
}

@media screen and (max-width: 960px) {
    .nav-links {
        display: none;
    }

    .nav-icons {
        padding: 10px 10px;
        margin: 0 auto;
    }

    .menu-hamburger {
        margin-right: 20px;
        font-size: 2em;
    }
}

@media screen and (max-width: 768px) {
    .nav-icons p {
        display: none;
    }

    .menu-hamburger {
        display: inline-block;
    }
}

@media screen and (max-width: 600px) {
    .nav-links {
        margin-right: 10px;
    }

    .nav-header h1 {
        font-size: 30px;
    }

    .nav-icons {
        padding: 4px 4px
    }

    .nav-icons i {
        font-size: 1.5em;
    }
}
</style>