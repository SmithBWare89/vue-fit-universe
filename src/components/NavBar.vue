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
    align-items: center;
}

.nav-links i {
    margin: 5px 5px;
}

.nav-icons {
    display: flex;
    align-items: center;
    margin: 0 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.nav-icons:hover {
    color: var(--white);
    background: var(--pewter);
}

</style>