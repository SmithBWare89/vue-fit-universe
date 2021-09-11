<template>
  <div class="hero-container">
        <video :src="yoga2" preload="auto" autoplay loop muted playsInline type="video/mp4" alt="A woman performing yoga on a sand dune whilst facing a city in the distance."/>
        <h1>FIT UNIVERSE</h1>
        <div class="hero-btns">
        <router-link :to="{ name: 'Login' }">
          <button>
              GET STARTED
          </button>
        </router-link>
    </div>
  </div>
</template>

<script>
import yoga2 from '../assets/videos/yoga2.mp4'

export default {
  name: 'Home',
  setup() {

    return { yoga2 }
  }
}
</script>
 