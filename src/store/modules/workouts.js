import { startOfMinute, startOfQuarter } from 'date-fns'
import { reactive, readonly } from 'vue'

const state = reactive({
    exercises: '',
    error: '',
    back: [],
    cardio: [],
    chest: [],
    legs: [],
    arms: [],
    neck: [],
    shoulders: [],
    core: [],
    modalDisplay: false,
    activeWorkout: [{
        movement: 'bench press',
        numberSets: 0,
        sets: {}
    }],
    ongoingWorkout: true
})

const methods = {
    async getExercises() {
        try {
            const response = await fetch("https://exercisedb.p.rapidapi.com/exercises", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
                    "x-rapidapi-key": "ff95631745msh38f883d1de356a1p18e460jsn1c84f216cb9a"
                }
            })
            const data = await response.json()
            state.exercises = data
        } catch (err) {
            state.error = err.message
        }
    },
    setExerciseState(bodyPart) {
        switch (bodyPart) {
            case 'back':
                state.back = state.exercises.filter(exercise => exercise.bodyPart === 'back').sort()
            case 'chest':
                state.chest = state.exercises.filter(exercise => exercise.bodyPart === 'chest').sort()
            case 'legs':
                state.legs = state.exercises.filter(exercise => exercise.bodyPart === 'lower legs' || exercise.bodyPart === 'upper legs').sort() 
            case 'arms':
                state.arms = state.exercises.filter(exercise => exercise.bodyPart === 'lower arms' || exercise.bodyPart === 'upper arms').sort()
            case 'neck':
                state.neck = state.exercises.filter(exercise => exercise.bodyPart === 'neck').sort() 
            case 'shoulders':
                state.shoulders = state.exercises.filter(exercise => exercise.bodyPart === 'shoulders').sort() 
            case 'core':
                state.core = state.exercises.filter(exercise => exercise.bodyPart === 'waist').sort() 
            case 'cardio':
                state.cardio = state.exercises.filter(exercise => exercise.bodyPart === 'cardio').sort()
        }
    },
    openModal() {
        state.modalDisplay = true
        if(state.activeWorkout.length >= 1) {
            state.ongoingWorkout = true
        } else {
            state.ongoingWorkout = false
        }
    },
    closeModal() {
        state.modalDisplay = false
        if(state.activeWorkout.length >= 1) {
            state.ongoingWorkout = true
        } else {
            state.ongoingWorkout = false
        }
    },
    addToWorkout(movement, state) {
        state.activeWorkout.push({
            movement,
            numberSets: 0,
            sets: []
        })
    },
    removeFromWorkout(movement) {
        state.activeWorkout = state.activeWorkout.filter(exercise => exercise.movement !== movement)
    },
    clearActiveWorkout() {
        state.activeWorkout = []
    },
    increaseSets(movement) {
        state.activeWorkout.map(exercise => {
            if (exercise.movement === movement) {
                exercise.numberSets++
                console.log(exercise.numberSets)
            }
        })
    },
    decreaseSets(movement) {
        state.activeWorkout.map((exercise, index, array) => {
            console.log(array)
            if (exercise.movement === movement && exercise.numberSets > 0) {
                exercise.numberSets--
                console.log(exercise.numberSets)
            }
        })
    },
    addNewSet(className, movementName) {
        const findMovement = state.activeWorkout.find(exercise => exercise.movement === movementName)
        findMovement.sets = {...findMovement.sets, [`${className}-rep`]: 0}
        findMovement.sets = {...findMovement.sets, [`${className}-weight`]: 0}
    },
    updateSet(className, value, movementName) {
        const findMovement = state.activeWorkout.find(exercise => exercise.movement === movementName)
        findMovement.sets = {...findMovement.sets, [className]: value}
    }
}

export default { state: readonly(state), methods}