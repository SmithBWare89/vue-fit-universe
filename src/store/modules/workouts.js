import { startOfMinute, startOfQuarter, startOfSecond } from 'date-fns'
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
    activeWorkout: [],
    ongoingWorkout: true
})

const methods = {
    async getExercises(bodyPart) {
        try {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
               "method": "GET",
                "headers": {
                    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
                    "x-rapidapi-key": "ff95631745msh38f883d1de356a1p18e460jsn1c84f216cb9a"
                }
            })
            const data = await response.json()
            state.exercises = data
            return data
        } catch (err) {
            state.error = err.message
        }
    },
    // setExerciseState(bodyPart) {
    //     switch (bodyPart) {
    //         case 'back':
    //             state.back = state.exercises.filter(exercise => exercise.bodyPart === 'back').sort()
    //             break;
    //         case 'chest':
    //             state.chest = state.exercises.filter(exercise => exercise.bodyPart === 'chest').sort()
    //             break;
    //         case 'legs':
    //             state.legs = state.exercises.filter(exercise => exercise.bodyPart === 'lower legs' || exercise.bodyPart === 'upper legs').sort() 
    //             break;
    //         case 'arms':
    //             state.arms = state.exercises.filter(exercise => exercise.bodyPart === 'lower arms' || exercise.bodyPart === 'upper arms').sort()
    //             break;
    //         case 'neck':
    //             state.neck = state.exercises.filter(exercise => exercise.bodyPart === 'neck').sort() 
    //             break;
    //         case 'shoulders':
    //             state.shoulders = state.exercises.filter(exercise => exercise.bodyPart === 'shoulders').sort() 
    //             break;
    //         case 'core':
    //             state.core = state.exercises.filter(exercise => exercise.bodyPart === 'waist').sort()
    //             break;
    //         case 'cardio':
    //             state.cardio = state.exercises.filter(exercise => exercise.bodyPart === 'cardio').sort()
    //             break;
    //     }
    // },
    addToWorkout(movement) {
        const formattedName = movement.replaceAll(' ', '-').replaceAll('/','-').replaceAll('(','').replaceAll(')','')

        state.activeWorkout.push({
            name: movement,
            formattedName: formattedName,
            numberSets: 1,
            sets: {}
        })
        
        state.activeWorkout.map(workout => {
            if(workout.name === movement) {
                const repName = `${workout.formattedName}-${workout.numberSets}-rep`
                const weightName = `${workout.formattedName}-${workout.numberSets}-weight`

                methods.addNewSet(repName, weightName, formattedName)
            }
        })
    },
    clearActiveWorkout() {
        state.activeWorkout = []
    },
    increaseSets(formattedName) {
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                workout.numberSets++
            }
        })
    },
    decreaseSets(formattedName) {
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName && workout.numberSets > 0) {
                workout.numberSets--
            }
        })
    },
    addNewSet(repName, weightName, formattedName) {
        state.activeWorkout.map(workout => {
            console.log(repName)
            if (workout.formattedName === formattedName) {
                workout.sets = { ...workout.sets, [`${repName}`]:  0}
                workout.sets = { ...workout.sets, [`${weightName}`]: 0}
            }
        })
    },
    updateReps(value, formattedName, repName) {
        console.log(formattedName)
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                console.log(workout)
                workout.sets = {...workout.sets, [`${repName}`]: value}
                console.log(workout.sets)
            }
        })
    },
    updateWeight(value, formattedName, weightName) {
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                workout.sets = {...workout.sets, [`${weightName}`]: value}
            }
        })
    },
    deleteSet(formattedName, repName, weightName) {
        state.activeWorkout.map((workout, index) => {
            if (workout.numberSets === 0) {
                state.activeWorkout = state.activeWorkout.filter(name => name.formattedName !== formattedName)
            } else {
                delete workout.sets?.[`${repName}`]
                delete workout.sets?.[`${weightName}`]
            }
        })
    },

}

export default { state: readonly(state), methods}