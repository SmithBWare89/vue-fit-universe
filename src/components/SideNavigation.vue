<template>
    <div v-if="navOpen" class="sidenav" ref="mySideNav">
        <div class="nav-close">
            &times;
        </div>
        <div class="nav-icons">
            <i class="fas fa-user fa-3x"></i>
            <p>User</p>
        </div>
        <div class="nav-icons">
            <i class="fas fa-home fa-3x"></i>
            <p>Home</p>
        </div>
        <div class="nav-icons">
            <i class="fas fa-dumbbell fa-3x"></i>
            <p>Worout</p>
        </div>
        <div class="nav-icons">
            <i class="fas fa-music fa-3x"></i>
            <p>Play Music</p>
        </div>
        <div class="nav-icons">
            <i class="fas fa-shopping-cart fa-3x"></i>
            <p>Shopping Cart</p>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
    name: 'SideNavigation',
    setup(props) {
        const mySideNav = ref(null)
        console.log(props)

        watch(props, () => {
            if(navOpen.value) {
                mySideNav.value.style.width = "250px"
                props.dashboardContent.value.style.marginLeft = "250px"
            } else {
                mySideNav.value.style.width = "0"
                props.dashboardContent.value.style.marginLeft = "0"
            }
        })

        // const openNav = (navOpen) => {
        //     mySideNav.value.style.width = "250px"
        //     props.dashboardContent.value.style.marginLeft = "250px"
        // }

        // const closeNav = (navOpen) => {
        //     mySideNav.value.style.width = "0"
        //     props.dashboardContent.value.style.marginLeft = "0"
        // }
    }
}
</script>

<style scoped>
 .sidenav {
     height: 100vh;
     width: 0;
     position: fixed;
     z-index: 1;
     top: 0;
     left: 0;
     background-color: black;
     color: white;
     overflow-x: hidden;
     padding-top: 60px;
     transition: 0.5s;
 }

 .nav-icons {
     padding: 8px 8px 8px 32px;
     text-decoration: none;
     font-size: 25px;
     color: #818181;
     display: block;
     transition: 0.3s;
 }

 @media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .nav-icons {font-size: 18px;}
}
</style>