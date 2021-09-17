<template>
    <div v-if="workouts.state.modalDisplay" id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                    <h2>Select Movement</h2>
                <div class="workout-select">
                    <button @click="handleSelection" id="All">All</button>
                    <button @click="handleSelection" id="Arms">Arms</button>
                    <button @click="handleSelection" id="Back">Back</button>
                    <button @click="handleSelection" id="Chest">Chest</button>
                    <button @click="handleSelection" id="Core">Core</button>
                    <button @click="handleSelection" id="Legs">Legs</button>
                    <button @click="handleSelection" id="Neck">Neck</button>
                    <button @click="handleSelection" id="Shoulders">Shoulders</button>
                </div>
            </div>
            <!-- Workout Selection -->
            <div class="exercise-list">
                <!-- Map over selected option from header and print -->
                <span v-for="exercise in selectedMovement" :key="exercise.id" :id="exercise.id">
                    <!-- Conditional - If workout already selected then add "Selected Class" -->
                    <span v-if="workouts.state.activeWorkout.indexOf(exercise.name) > -1">
                        <button class="selected" @click="addMovement">{{exercise.name}}</button>
                    </span>
                    <!-- ELSE -->
                    <span v-else>
                        <button @click="addMovement">{{exercise.name}}</button>
                    </span>
                </span>
            </div>
            <button class="close" @click="workouts.methods.closeModal">Save Movements</button>
        </div>
    </div>
</template>

<script>
import { inject, ref, watch } from '@vue/runtime-core'
export default {
    name: 'WorkoutModal',
    setup() {
        const store = inject('store')
        const selectedMovement = ref({})
        const storeMovement = ref({})
        const { workouts } = store

        // Switch operator to return the movements requested
        const handleSelection = (e) => {
            const selected = e.target.innerHTML
            //  switch (selected) {
            //      case "All":
            //         selectedMovement.value = workouts.state.exercises
            //         break;
            //      case "Back":
            //         selectedMovement.value = workouts.state.back
            //         break;
            //      case "Cardio":
            //         selectedMovement.value = workouts.state.cardio
            //         break;
            //      case "Chest":
            //         selectedMovement.value = workouts.state.chest
            //         break;
            //      case "Legs":
            //         selectedMovement.value = workouts.state.legs
            //         break;
            //      case "Arms":
            //         selectedMovement.value = workouts.state.arms
            //         break;
            //      case "Neck":
            //         selectedMovement.value = workouts.state.neck
            //         break;
            //      case "Shoulders":
            //         selectedMovement.value = workouts.state.shoulders
            //         break;
            //      case "Core":
            //         selectedMovement.value = workouts.state.core
            //         break;
            //     default:
            //         selectedMovement.value = workouts.state.exercises
            //         break;
            //  }
        }

        // Add/Remove movement to activeWorkouts state
        const addMovement = (e) => {
            const movement = e.target.innerHTML

            if (workouts.state.activeWorkout.includes(movement)) {
                e.target.classList.remove("selected")
                return workouts.methods.removeFromWorkout(movement)
            }

            e.target.classList.add("selected")
            return workouts.methods.addToWorkout(movement)
        }

        watch(selectedMovement.value, () => {
            storeMovement.value = selectedMovement.value
        })

        return { workouts, handleSelection, selectedMovement, addMovement, storeMovement }
    }
}
</script>

<style scoped>
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-header {
    display: flex;
    flex-direction: column;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
    background: var(--green);
    color: var(--white);
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: var(--green);
    background: var(--white);
  text-decoration: none;
  cursor: pointer;
}

.workout-select {
    display: flex;
    justify-content: flex-start;
}

.exercise-list {
    overflow: auto;
    max-height: 300px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-self: left;
}

h2 {
    margin-bottom: 2px;
}

button {
    margin-right: 5px;
}

button:hover,
button:focus {
    color: var(--munsell);
    background: var(--white);
  text-decoration: none;
  cursor: pointer;
}

.exercise-list::-webkit-scrollbar {
  display: none;
}

.selected {
    background: var(--white);
    color: var(--munsell);
}

</style>