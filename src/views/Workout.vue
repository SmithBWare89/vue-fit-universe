<template>
  <p>Hello!</p>
</template>

<script>
import { inject, onMounted} from '@vue/runtime-core'
import useAddToCollection from '../composables/addToCollection'

export default {
    name: 'Workout',
    setup() {
      const { error, addToCollection } = useAddToCollection()
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
    }
}
</script>

<style>

</style>