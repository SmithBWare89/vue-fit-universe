import { reactive, readonly } from 'vue'

const state = reactive({
    exercises: '',
    error: '',
    back: '',
    cardio: '',
    chest: '',
    legs: '',
    arms: '',
    neck: '',
    shoulders: '',
    core: '',
    modalDisplay: false
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
                state.back = state.exercises.filter(exercise => exercise.bodyPart === 'back') 
            case 'chest':
                state.chest = state.exercises.filter(exercise => exercise.bodyPart === 'chest') 
            case 'legs':
                state.legs = state.exercises.filter(exercise => exercise.bodyPart === 'lower legs' || exercise.bodyPart === 'upper legs') 
            case 'arms':
                state.arms = state.exercises.filter(exercise => exercise.bodyPart === 'lower arms' || exercise.bodyPart === 'upper arms')
            case 'neck':
                state.neck = state.exercises.filter(exercise => exercise.bodyPart === 'neck') 
            case 'shoulders':
                state.shoulders = state.exercises.filter(exercise => exercise.bodyPart === 'shoulders') 
            case 'core':
                state.core = state.exercises.filter(exercise => exercise.bodyPart === 'waist') 
            case 'cardio':
                state.cardio = state.exercises.filter(exercise => exercise.bodyPart === 'cardio') 
        }
    },
    openModal() {
        state.modalDisplay = true
    },
    closeModal() {
        state.modalDisplay = false
    }
}

export default { state: readonly(state), methods}