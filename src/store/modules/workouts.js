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
    activeWorkout: {},
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
    addToWorkout(movement) {
        state.activeWorkout = {...state.activeWorkout, [`${movement}`]: {
            name: movement,
            formattedName: `${movement.replaceAll(' ', '-').replaceAll('/','-').replaceAll('(','').replaceAll(')','')}`,
            numberSets: 0,
            sets: {}
        }}
    },
    removeFromWorkout(movement) {
        delete state.activeWorkout[movement]
    },
    clearActiveWorkout() {
        state.activeWorkout = {}
    },
    increaseSets(name) {
        console.log(state.activeWorkout)
        state.activeWorkout[name].numberSets++
        console.log(state.activeWorkout[name].numberSets)
    },
    decreaseSets(name) {
        console.log(state.activeWorkout[name].numberSets)
        if (state.activeWorkout[name].numberSets !== 0) {
            state.activeWorkout[name].numberSets--
        }
        console.log(state.activeWorkout[movement].numberSets)
    },
    addNewSet(className, name) {
        state.activeWorkout[name].sets = { ...state.activeWorkout[name].sets, [`${className}-rep`]: 0}
        state.activeWorkout[name].sets = { ...state.activeWorkout[name].sets, [`${className}-weight`]: 0}
        methods.increaseSets(name)
    },
    updateSet(className, value, movementName) {
        const findMovement = state.activeWorkout.find(exercise => exercise.movement === movementName)
        findMovement.sets = {...findMovement.sets, [className]: value}
    },
    deleteSet(className, formattedName, name) {
        console.log(state.activeWorkout)
        console.log(className)
        console.log(formattedName)
        console.log(name)
        console.log(state.activeWorkout[name].sets)
        console.log(Object.keys(state.activeWorkout[name].sets))
    }
}

export default { state: readonly(state), methods}