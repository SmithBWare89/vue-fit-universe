<template>
      <div>
        <video :src="fit" preload="auto" autoplay loop muted playsInline type="video/mp4" alt="A video of women in a yoga class stretching."/>
    </div>
  <div class="form-container">
    <h1>Signup for an account</h1>
    <form @submit.prevent="handleSignup">
      <input type="text" v-model="displayName" placeholder="Display Name" required />
      <input type="email" v-model="email" placeholder="email" required />
      <input type="password" v-model="password" placeholder="password" required />
      <div class="error" v-if="error">{{ error }}</div>
      <button v-if="!isPending">Login</button>
      <button v-if="isPending">Logging in...</button>
    </form>
    <div class="auth-switcher">
        <p>Already have an account? <router-link :to="{ name: 'Login' }">Login</router-link></p>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import fit from '../assets/videos/fit.mp4'
import useSignup from '../composables/signup'
import { useRouter } from 'vue-router';


export default {
    name: 'Signup',
    setup() {
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const { error, signup, isPending } = useSignup()
        const router = useRouter()

        const handleSignup = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value) {
                console.log('user logged in')
                router.push({ name: 'Dashboard'})
            }
        }

        return { fit, email, password, displayName, handleSignup, isPending }
    }
}
</script>

<style>

</style>