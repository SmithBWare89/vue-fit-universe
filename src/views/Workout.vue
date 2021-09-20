<template>
  <n-space vertical align="center" class="workout">
      <button class="select-workouts" @click.prevent="modal.methods.openModal">Select Workouts</button>
    <!-- <ActiveWorkout /> -->
    <WorkoutModal />
    <NaiveWorkout />
  </n-space>
</template>

<script>
import { inject, onMounted} from '@vue/runtime-core'
import ActiveWorkout from '../components/ActiveWorkout.vue'
import { NSpace } from 'naive-ui'
import WorkoutModal from '../components/WorkoutModal.vue'
import NaiveWorkout from '../components/NaiveWorkout.vue'

export default {
    name: 'Workout',
    components: { WorkoutModal, ActiveWorkout, NSpace, NaiveWorkout },
    setup() {
      const { workouts, modal } = inject('store')
      
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

      return { modal, workouts, handleModalDisplay }
    }
}
</script>

<style scoped>
.workout {
  margin: 0 auto;
  width: 100%;
  scroll-behavior: smooth;
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