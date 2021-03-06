<template>
    <div id="active-workout" v-if="Object.keys(workouts.state.activeWorkout).length >= 1">
        <div v-for="workout in workouts.state.activeWorkout" :key="workout">
            <div class="card">
                {{ workout }}
                <div>
                    <h1 class="card-header">{{ workout.name }}</h1>
                    <button @click="addSet($event, workout.formattedName, workout.name, workout.numberSets)" class="add-set" ref="addSetButton">Add Set</button>
                    <button @click="deleteSet($event, workout.formattedName, workout.name, workout.numberSets)" class="delete-set">Delete Set</button>
                </div>
                <div id="sets-container">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref } from '@vue/runtime-core'

export default {
    name: 'ActiveWorkout',
    setup() {
        const store = inject('store')
        const sets = ref(null)
        const movementClass = ref(null)
        const { workouts } = store

    // Click to add the set
    // Add button and two inputs to sets field
        const addSet = (e, formattedName, name, numberSets) => {

            const sets = document.getElementById("sets-container")
            movementClass.value = `${formattedName}-${numberSets}`

            const wrapperEl = document.createElement("div")
            wrapperEl.setAttribute("class", "sets")
            wrapperEl.classList.add(movementClass.value)

            const buttonEl = document.createElement("button")
            buttonEl.textContent = `Set - ${numberSets+1}`
            buttonEl.setAttribute("class", movementClass.value)
            buttonEl.classList.add("sets-button")

            wrapperEl.appendChild(buttonEl)

            const setInput = document.createElement("input")
            setInput.setAttribute("class", movementClass.value)
            setInput.setAttribute("class", `${movementClass.value}-rep`)
            setInput.setAttribute("name", formattedName)
            setInput.setAttribute("type", "number")
            setInput.setAttribute("min", 1)
            setInput.setAttribute("max", 100)
            setInput.setAttribute("placeholder", "Enter Reps")

            setInput.classList.add(`set-inputs`)
            wrapperEl.appendChild(setInput)

            const repsInput = document.createElement("input")
            repsInput.setAttribute("class", movementClass.value)
            repsInput.setAttribute("class", `${movementClass.value}-weight`)
            repsInput.setAttribute("name", formattedName)
            repsInput.setAttribute("type", "number")
            repsInput.setAttribute("min", 2)
            repsInput.setAttribute("max", 500)
            repsInput.setAttribute("placeholder", "Enter Weight")
            repsInput.classList.add(`set-inputs`)
            wrapperEl.appendChild(repsInput)

            sets.appendChild(wrapperEl)

            workouts.methods.addNewSet(movementClass.value, name)
        }

        const deleteSet = (e, formattedName, name, numberSets) => {
            movementClass.value = `${formattedName}-${numberSets}`

            const el = document.getElementsByClassName(movementClass.value)

            while (el.length > 0) {
                el[0].parentNode.removeChild(el[0])
            }

            workouts.methods.deleteSet(movementClass.value, formattedName, name)
        }

        document.addEventListener('change', (e) => {
            // See if the className matches for the formattedName and if so pass it and its value to update
            if (e.target.classList[0] === `${movementClass.value}-weight`) {
                workouts.methods.updateSet(`${movementClass.value}-weight`, e.target.value, e.target.getAttribute("name"))
            } else if(e.target.classList[0] === `${movementClass.value}-rep`) {
                workouts.methods.updateSet(`${movementClass.value}-rep`, e.target.value, e.target.getAttribute("name"))
            }
        })

        return { workouts, sets, addSet, deleteSet, movementClass }
    }
}
</script>

<style>
.card {
    height: auto;
    width: 600px;
    background-color: var(--pewter);
    padding: 10px;
    margin: 10px auto;
    border-radius: 10px 10px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-content: flex-start;
}

.delete-set {
    background-color: var(--red);
    color: var(--white);
    margin-left: 5px;
}


.delete-set:hover{
    background-color: var(--white);
    color: var(--red);
    cursor: pointer;
}

.add-set {
    background-color: var(--green);
    color: var(--white);
}

.add-set:hover {
    background-color: var(--white);
    color: var(--green);
    cursor: pointer;
}

.card-header {
    font-family: 'Fira Sans', sans-serif;
    font-size: 1.2em;
}

.sets {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    margin-top: 5px;
    margin-bottom: 10px;
}

label {
    text-align: left !important;
}

.set-inputs {
    margin-right: 10px;
    width: 100%;
    height: auto;
}

.sets-button {
    width: 100%;
    height: 100% !important;
    margin-bottom: 0px;
}

button {
    margin-right: 10px;
}

input[type="number"] {
    border-radius: 10px;
}

label {
    font-size: 16px;
    font-family: 'Fira Sans', sans-serif;
    font-weight: 600;
}
</style>