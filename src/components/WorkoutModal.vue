<template>
    <div v-if="workouts.state.modalDisplay" id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h2 class="section-name">Select Exercise Focus</h2>
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
            <h2 class="section-name">Select Movement</h2>
            <div class="exercise-list">
                <!-- Map over selected option from header and print -->
                <span v-for="exercise in selectedMovement" :key="exercise.id" :id="exercise.id">
                    <!-- Conditional - If workout already selected then add "Selected Class" -->
                    <button @click="addMovement">{{exercise.name}}</button>
                </span>
            </div>
            <!-- Close Button -->
            <div>
                <button class="close" @click="workouts.methods.closeModal">Save/Exit</button>
                <button class="clear-workout" @click="workouts.methods.clearActiveWorkout">Clear Workout</button>
            </div>
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
             switch (selected) {
                 case "All":
                    selectedMovement.value = workouts.state.exercises
                    break;
                 case "Back":
                    selectedMovement.value = workouts.state.back
                    break;
                 case "Cardio":
                    selectedMovement.value = workouts.state.cardio
                    break;
                 case "Chest":
                    selectedMovement.value = workouts.state.chest
                    break;
                 case "Legs":
                    selectedMovement.value = workouts.state.legs
                    break;
                 case "Arms":
                    selectedMovement.value = workouts.state.arms
                    break;
                 case "Neck":
                    selectedMovement.value = workouts.state.neck
                    break;
                 case "Shoulders":
                    selectedMovement.value = workouts.state.shoulders
                    break;
                 case "Core":
                    selectedMovement.value = workouts.state.core
                    break;
                default:
                    selectedMovement.value = workouts.state.exercises
                    break;
             }
        }

        // Add/Remove movement to activeWorkouts state
        const addMovement = (e) => {
            const movement = e.target.innerHTML

            if (!Object.keys(workouts.state.activeWorkout).includes(movement)) {
                e.target.classList.remove("selected")
                workouts.methods.addToWorkout(movement)
            } else {
                e.target.classList.add("selected")
                workouts.methods.removeFromWorkout(movement)
            }
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
    max-height: 250px !important;
    display: grid;
    /* flex-direction: column;
    justify-content: space-between;
    justify-self: left; */
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
}

h2 {
    margin-bottom: 2px;
}

button {
    margin-right: 5px;
    font-family: 'Fira Sans', sans-serif;
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


.section-name {
    font-family: 'Fira Sans', sans-serif;
    font-size: 30px;
    border-bottom: 2px solid var(--munsell);
    margin-bottom: 10px;
}

.clear-workout {
    background-color: var(--red);
}

.clear-workout:hover,
.clear-workout:focus {
    background-color: var(--white);
    color: var(--red);
}

@media screen and (min-width: 600px) and (max-width: 900px) {
    .workout-select {
        flex-wrap: wrap;
    }

    .section-name {
        font-size: 25px;
    }

    .exercise-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media screen and (min-width: 300px) and (max-width: 599px)  {
    .exercise-list {
        grid-template-columns: 1fr;
    }

    .workout-select {
        flex-wrap: wrap;
    }
}
</style>