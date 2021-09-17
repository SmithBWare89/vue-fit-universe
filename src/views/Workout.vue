<template>
  <div v-if="workouts.state.ongoingWorkout">
    <ActiveWorkout />
  </div>
  <div v-else>
      <button class="select-workouts" @click.prevent="workouts.methods.openModal">Select Workouts</button>
      <WorkoutModal />
  </div>
</template>

<script>
import { inject, onMounted} from '@vue/runtime-core'
import WorkoutModal from '../components/WorkoutModal.vue'
import ActiveWorkout from '../components/ActiveWorkout.vue'

export default {
    name: 'Workout',
    components: {WorkoutModal, ActiveWorkout},
    setup() {
      const store = inject('store')
      const { workouts } = store
      
      onMounted(async () => {
        if(!workouts.state.exercises.length) {
          await workouts.methods.getExercises()
          workouts.methods.setExerciseState('back')
          workouts.methods.setExerciseState('shoulders')
          workouts.methods.setExerciseState('neck')
          workouts.methods.setExerciseState('arms')
          workouts.methods.setExerciseState('legs')
          workouts.methods.setExerciseState('chest')
          workouts.methods.setExerciseState('cardio')
          workouts.methods.setExerciseState('core')
          workouts.methods.setExerciseState('back')
        }
      })

      const handleModalDisplay = () => {
        workouts.methods.setModalDisplay(true)
        console.log(workouts.state.modalDisplay)
      }

      return { workouts, handleModalDisplay }
    }
}
</script>

<style scoped>
.select-workouts {
  margin: 0 auto !important;
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