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
    activeWorkout: []
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
    },
    closeModal() {
        state.modalDisplay = false
    },
    addToWorkout(movement) {
        state.activeWorkout.push(movement)
    },
    removeFromWorkout(movement) {
        state.activeWorkout = state.activeWorkout.filter(exercise => exercise !== movement)
    }
}

export default { state: readonly(state), methods}