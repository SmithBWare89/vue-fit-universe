<template>
    <div>
        <video :src="run" preload="auto" autoplay loop muted playsInline type="video/mp4" alt="A video of a man jogging briskly across on a beach."/>
    </div>
  <div class="form-container">
    <h1>Login to your account</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="email" required />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        required
      />
      <div class="error" v-if="error">{{ error }}</div>
      <button v-if="!isPending">Login</button>
      <button v-if="isPending">Logging in...</button>
    </form>
    <div class="auth-switcher">
        <p>New to us? <router-link :to="{ name: 'Signup' }">Sign Up</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import useLogin from '../composables/login'
import run from '../assets/videos/run.mp4'
import { useRouter } from 'vue-router';


export default {
  name: "Login",
  setup() {
      const email = ref('')
      const password = ref('')
      const router = useRouter()
     
      const { error, loginUser, isPending } = useLogin();

      const handleLogin = async () => {
          await loginUser(email.value, password.value)
          if(!error.value) {
              router.push({ name: 'Dashboard'})
          }
      }

      return { handleLogin, email, password, error, isPending, run }

  }
};
</script>

<style>
</style>