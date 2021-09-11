<template>
      <div>
        <video :src="fit" preload="auto" autoplay loop muted playsInline type="video/mp4" />
    </div>
  <div class="form-container">
    <h1>Signup for an account</h1>
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
import { ref } from '@vue/reactivity'
import fit from '../assets/videos/fit.mp4'
import useSignup from '../composables/signup'

export default {
    name: 'Signup',
    setup() {
        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const { error, signup, isPending } = useSignup()

        return { fit }
    }
}
</script>

<style>

</style>