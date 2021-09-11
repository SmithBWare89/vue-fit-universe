<template>
    <nav>
        <div class="nav-header">
            <h1>Fit Universe</h1>
        </div>
        <div class="nav-links">
            <span class="nav-icons">
                <i class="fas fa-user"></i>
                <p>User</p>
            </span>
            <span class="nav-icons">
                <i class="fas fa-home"></i>
                <p>Home</p>
            </span>
            <span class="nav-icons">
                <i class="fas fa-dumbbell"></i>
                <p>Workouts</p>
            </span>
            <span class="nav-icons">
                <i class="fas fa-music"></i>
                <p>Music</p>
            </span>
            <span class="nav-icons">
                <i class="fas fa-shopping-cart"></i>
                <p>Shop</p>
            </span>
        </div>
    </nav>
    
</template>

<script>
export default {
    name: 'NavBar'
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
    font-size: 24px;
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
    padding: 5px 5px;
}

.nav-icons:hover {
    color: var(--white);
    background: var(--pewter);
    height: 2em;
}

@media screen and (max-width: 960px) {
    .nav-links {
        margin-right: 60px;
    }

    .nav-icons {
        padding-left: 5px;
        padding-right: 5px;
        margin: 0 auto;
    }
}

@media screen and (max-width: 768px) {
    .nav-icons p {
        display: none;
    }
}

@media screen and (max-width: 600px) {
    .nav-links {
        margin-right: 10px;
    }
}
</style>