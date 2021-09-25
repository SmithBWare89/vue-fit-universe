<template>
  <n-space vertical align="center" class="workout">
      <h1 v-if="workouts.state.error">{{ workouts.state.error }}</h1>
      <button class="select-workouts" @click.prevent="modal.methods.openModal" v-if="workouts.state.activeWorkout.length <= 0">Start Your Workout</button>
      <n-space align="Center" v-else>
        <!-- <button class="select-workouts" @click.prevent="workouts.methods.saveWorkout(user)">Save Your Workout</button> -->
        <button class="select-workouts" @click.prevent="workouts.methods.clearActiveWorkout">Reset Workout</button>
      </n-space>
    <!-- <ActiveWorkout /> -->
    <WorkoutModal />
    <NaiveWorkout />
  </n-space>
</template>

<script>
import { inject } from '@vue/runtime-core'
import ActiveWorkout from '../components/ActiveWorkout.vue'
import { NSpace, NLayout } from 'naive-ui'
import WorkoutModal from '../components/WorkoutModal.vue'
import NaiveWorkout from '../components/NaiveWorkout.vue'
import getUser from '../composables/getUser'

export default {
    name: 'Workout',
    components: { WorkoutModal, ActiveWorkout, NSpace, NaiveWorkout, NLayout },
    setup() {
      const { workouts, modal } = inject('store')
      const { user } = getUser()

      const handleModalDisplay = () => {
        workouts.methods.setModalDisplay(true)
      }

      return { modal, workouts, handleModalDisplay, user }
    }
}
</script>

<style scoped>
.workout {
  margin: 0 auto;
  width: 100%;
}

.select-workouts {
  font-size: 40px;
  background-color: var(--white);
  color: var(--munsell);
  margin-top: 30px !important;
  margin-left: 30px !important;
}

.select-workouts:hover,
.select-workouts:focus {
  background-color: var(--pewter);
  color: var(--white);
}
</style>