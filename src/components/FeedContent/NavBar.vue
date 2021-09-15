<template>
  <nav id="navContainer">
    <div>
      <div v-if="user" class="userInfo">
        <span class="name">Hey there, {{ user.displayName }}!</span>
        <span class="email">Currently logged in as {{ user.email }}</span>
      </div>
      <div v-else>
        {{ error }}
      </div>
    </div>
    <div>
      <button @click="handleLogout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
// Composables
import getUser from "../../composables/getUser";
import useLogout from "../../composables/signout";

export default {
  name: "NavBar",
  setup() {
    const { error, logout } = useLogout();
    const { user } = getUser();
    const router = useRouter()

    // Async function to handle logout button click
    const handleLogout = async () => {
      await logout();
      if(!error.value) {
        router.push({name: 'Welcome'})
      }
    };

    return { handleLogout, error, user };
  },
};
</script>

<style>
#navContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--beau);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px;
  margin-bottom: 0 !important;
}

.userInfo {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: left;
}

.name {
  font-size: 1.5rem;
  font-family: 'Fira Sans', sans-serif;
}

.email {
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
}
</style>