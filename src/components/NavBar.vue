<template>
    <nav>
        <div class="nav-header">
            <h1>Fit Universe</h1>
        </div>
        <div class="nav-links">
            <span class="nav-icons" @click="handleRouterClick('Dashboard')">
                <i class="fas fa-home fa-3x"></i>
            </span>
            <span class="nav-icons" @click="handleRouterClick('User')">
                <i class="fas fa-user fa-3x"></i>
            </span>
            <span class="nav-icons" @click="handleRouterClick('Workout')">
                <i class="fas fa-dumbbell fa-3x"></i>
            </span>
            <!-- <span class="nav-icons">
                <i class="fas fa-music fa-3x"></i>
            </span> -->
            <span class="nav-icons" @click="handleRouterClick('Shop')">
                <i class="fas fa-shopping-cart fa-3x"></i>
            </span>
            <span class="nav-icons" @click="handleSignout">
                <i class="fas fa-sign-out-alt fa-3x"></i>
            </span>
        </div>
    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import useLogout from '../composables/signout'

export default {
    name: 'NavBar',
    setup() {
        const router = useRouter()
        const { error, logout } = useLogout()

        const handleRouterClick = (path) => {
            router.push({ name: path })
        }

        const handleSignout = async () => {
            const response = await logout()
            if (!error.value) {
                router.push({ name: 'Home' })
            }
        }

        return { 
            handleRouterClick, 
            handleSignout
        }
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
}

.nav-header {
    margin: 0px 0px 0px 10px;
}

.nav-header h1 {
    margin: 0;
    font-size: 60px;
}

.nav-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    margin-right: 10px;
}

.nav-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px;
    padding: 20px 20px;
    font-size: 1em;
}

.nav-icons:hover {
    color: var(--white);
    background: var(--pewter);
}

li {
    color: none
}

@media screen and (max-width: 960px) {
}

@media screen and (max-width: 768px) {
    .nav-icons {
        font-size: .8em;
    }

    .nav-header h1 {
        font-size: 45px;
    }
}

@media screen and (max-width: 600px) {
    nav {
        width: 100%;
    }

    .nav-icons {
        font-size: .4em;
        padding: 10px 10px;
        margin: 0 5px;
    }

    .nav-header h1 {
        font-size: 16px;
    }
}
</style>