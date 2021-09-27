<template>
  <n-space vertical align="center" class="workout" v-if="workouts.state.ongoingWorkout">
      <!-- Error Handling -->
      <h1 v-if="workouts.state.error">{{ workouts.state.error }}</h1>

      <n-space>
        <!-- Finish and Save Workout -->
        <button class="select-workouts" @click.prevent="workouts.methods.saveWorkout(user)">Finish and Save</button>

        <!-- Start and Add to workout conditionals -->
        <button class="select-workouts" @click.prevent="modal.methods.openModal">Add To Workout</button>

        <!-- Reset, Save Progress, and Delete Save -->
        <button class="select-workouts" v-if="workouts.state.ongoingWorkout" @click.prevent="workouts.methods.clearActiveWorkout(user)">Reset Workout</button>
        <button class="select-workouts" v-if="workouts.state.ongoingWorkout" @click.prevent="handleSaveProgress(user)">Save Progress</button>
        <!-- <button class="select-workouts saved" v-if="workouts.state.savedWorkout" @click.prevent="handleRemoveProgress">Delete Save</button> -->
      </n-space>
  </n-space>
  <n-space vertical align="center" class="workout" v-else>
      <!-- Error Handling -->
      <h1 v-if="workouts.state.error">{{ workouts.state.error }}</h1>

      <button class="select-workouts" @click.prevent="modal.methods.openModal" v-else>Start Your Workout</button>
  </n-space>
    <!-- Components -->
    <WorkoutModal />
    <NaiveWorkout />
</template>

<script>
import { inject, onMounted } from '@vue/runtime-core'
import ActiveWorkout from '../components/ActiveWorkout.vue'
import { NSpace, NLayout } from 'naive-ui'
import WorkoutModal from '../components/WorkoutModal.vue'
import NaiveWorkout from '../components/Workout.vue'
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
        await getWorkout(user.value.uid)
        if(workoutData.value && !getWorkoutError.value) {
          workouts.methods.setSavedProgress(workoutData.value)
        }
      })

      const handleModalDisplay = () => {
        workouts.methods.setModalDisplay(true)
      }

      const handleSaveProgress = async (user) => {
        await workouts.methods.saveProgress(user)
      }

      // const handleRemoveProgress = async () => {
      //   await workouts.methods.deleteSavedProgress
      // }

      return { modal, workouts, handleModalDisplay, user, handleSaveProgress }
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