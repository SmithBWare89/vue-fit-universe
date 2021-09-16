<template>
    <div v-if="workouts.state.modalDisplay" id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <div class="workout-select">
                    <span>All</span>
                    <button @click="handleSelection" id="back">Back</button>
                    <span class="close" @click="workouts.methods.closeModal">&times;</span>
                </div>
            </div>
            <div class="exercise-list">
                <span v-for="exercise in selectedMovement" :key="exercise.id" :id="exercise.id">
                    <span v-if="workouts.state.activeWorkout.indexOf(exercise.name) > -1">
                        <button class="selected" @click="addMovement">{{exercise.name}}</button>
                    </span>
                    <span v-else>
                        <button @click="addMovement">{{exercise.name}}</button>
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref } from '@vue/runtime-core'
export default {
    name: 'WorkoutModal',
    setup() {
        const store = inject('store')
        const selectedMovement = ref('')
        const { workouts } = store

        const handleSelection = (e) => {
            const selected = e.target.innerHTML
             switch (selected) {
                 case "Back":
                    selectedMovement.value = workouts.state.back
             }
        }

        const addMovement = (e) => {
            const movement = e.target.innerHTML

            if (workouts.state.activeWorkout.includes(movement)) {
                e.target.classList.remove("selected")
                return workouts.methods.removeFromWorkout(movement)
            }

            e.target.classList.add("selected")
            return workouts.methods.addToWorkout(movement)
        }

        return { workouts, handleSelection, selectedMovement, addMovement }
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

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

.close {
  color: #aaa;
  /* float: right; */
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.workout-select {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.exercise-list {
    overflow: auto;
    max-height: 300px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-self: left;
}

button {
    margin: 5px 10px;
}

.exercise-list::-webkit-scrollbar {
  display: none;
}

.selected {
    background: var(--white);
    color: var(--munsell);
}

</style>