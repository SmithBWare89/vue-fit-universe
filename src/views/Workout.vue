<template>
  <button @click.prevent="workouts.methods.openModal">Select Workouts</button>
  <WorkoutModal />
</template>

<script>
import { inject, onMounted} from '@vue/runtime-core'
import WorkoutModal from '../components/WorkoutModal.vue'

export default {
    name: 'Workout',
    components: {WorkoutModal},
    setup() {
      const store = inject('store')
      const { workouts } = store
      
      // onMounted(async () => {
      //   if(!workouts.state.exercises.length) {
      //     await workouts.methods.getExercises()
      //     workouts.methods.setExerciseState('back')
      //     workouts.methods.setExerciseState('shoulders')
      //     workouts.methods.setExerciseState('neck')
      //     workouts.methods.setExerciseState('arms')
      //     workouts.methods.setExerciseState('legs')
      //     workouts.methods.setExerciseState('chest')
      //     workouts.methods.setExerciseState('cardio')
      //     workouts.methods.setExerciseState('core')
      //     workouts.methods.setExerciseState('back')
      //   }
      // })

      const handleModalDisplay = () => {
        workouts.methods.setModalDisplay(true)
        console.log(workouts.state.modalDisplay)
      }

      return { workouts, handleModalDisplay }
    }
}
</script>

<style>

</style>