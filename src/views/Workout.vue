<template>
  <n-space vertical align="center" class="workout">
      <!-- Error Handling -->
      <h1 v-if="workouts.state.error">{{ workouts.state.error }}</h1>

      <!-- Finish and Save Workout -->
      <button class="select-workouts" @click.prevent="workouts.methods.saveWorkout(user)" v-if="workouts.state.ongoingWorkout">Finish and Save</button>

      <!-- Start and Add to workout conditionals -->
      <button class="select-workouts" @click.prevent="modal.methods.openModal" v-if="workouts.state.ongoingWorkout">Add To Workout</button>
      <button class="select-workouts" @click.prevent="modal.methods.openModal" v-else>Start Your Workout</button>

      <!-- Reset, Save Progress, and Delete Save -->
      <button class="select-workouts" v-if="workouts.state.ongoingWorkout" @click.prevent="workouts.methods.clearActiveWorkout">Reset Workout</button>
      <button class="select-workouts" v-if="workouts.state.ongoingWorkout" @click.prevent="handleSaveProgress">Save Progress</button>
      <!-- <button class="select-workouts saved" v-if="workouts.state.savedWorkout" @click.prevent="handleRemoveProgress">Delete Save</button> -->

    <!-- Components -->
    <WorkoutModal />
    <NaiveWorkout />
  </n-space>
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import ActiveWorkout from '../components/ActiveWorkout.vue'
import { NSpace, NLayout } from 'naive-ui'
import WorkoutModal from '../components/WorkoutModal.vue'
import NaiveWorkout from '../components/NaiveWorkout.vue'
import getUser from '../composables/getUser'
import useGetWorkout from '@/composables/getWorkout'

export default {
    name: 'Workout',
    components: { WorkoutModal, ActiveWorkout, NSpace, NaiveWorkout, NLayout },
    setup() {
      const { workouts, modal } = inject('store')
      const { user } = getUser()
      const { getWorkout, workoutData, getWorkoutError } = useGetWorkout()

      onMounted(async () => {
        await getWorkout()

        if(workoutData.value && !getWorkoutError.value) {
          workouts.methods.setSavedProgress(workoutData.value)
        }
      })

      const handleModalDisplay = () => {
        workouts.methods.setModalDisplay(true)
      }

      const handleSaveProgress = async () => {
        await workouts.methods.updateProgress()
      }

      // const handleRemoveProgress = async () => {
      //   await workouts.methods.deleteSavedProgress
      // }

      return { modal, workouts, handleModalDisplay, user, handleSaveProgress, handleRemoveProgress }
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

.saved:hover {
    background-color: var(--green);
    color: var(--white);
    cursor: pointer;
}

</style>