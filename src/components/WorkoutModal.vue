<template>
    <div v-if="workouts.state.modalDisplay" id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <nav class="workout-select">
                    <span>All</span>
                    <span>Back</span>
                    <span>Shoulders</span>
                    <span>Neck</span>
                    <span>Arms</span>
                    <span>Legs</span>
                    <span>Chest</span>
                    <span>Cardio</span>
                    <span>Core</span>
                    <span>Back</span>
                    <span class="close" @click="workouts.methods.closeModal">&times;</span>
                </nav>
            </div>
            <input>
            <p>Some text in the Modal..</p>
        </div>
    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    name: 'WorkoutModal',
    setup() {
        const store = inject('store')
        console.log(store)
        const { workouts } = store

        // 


        return { workouts }
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
</style>