import { startOfMinute, startOfQuarter, startOfSecond } from 'date-fns'
import { reactive, readonly } from 'vue'
import useCollection from '@/composables/addDocument.js'
const { addDoc, isPending } = useCollection()

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
    ongoingWorkout: false
})

const methods = {
    async getExercises(bodyPart) {
        state.error = null
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
    addToWorkout(movement) {
        state.error = null
        const formattedName = movement.replaceAll(' ', '-').replaceAll('/','-').replaceAll('(','').replaceAll(')','')

        state.activeWorkout.push({
            name: movement,
            formattedName: formattedName,
            numberSets: 1,
            sets: {},
            saved: false
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
        state.error = null
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                workout.numberSets++
            }
        })
    },
    decreaseSets(formattedName) {
        state.error = null
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName && workout.numberSets > 0) {
                workout.numberSets--
            }
        })
    },
    addNewSet(repName, weightName, formattedName) {
        state.error = null
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                workout.sets = { ...workout.sets, [`${repName}`]:  0}
                workout.sets = { ...workout.sets, [`${weightName}`]: 0}
            }
        })
    },
    updateReps(value, formattedName, repName) {
        state.error = null
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                console.log(workout)
                workout.sets = {...workout.sets, [`${repName}`]: value}
                console.log(workout.sets)
            }
        })
    },
    updateWeight(value, formattedName, weightName) {
        state.error = null
        state.activeWorkout.map(workout => {
            if (workout.formattedName === formattedName) {
                workout.sets = {...workout.sets, [`${weightName}`]: value}
            }
        })
    },
    deleteSet(formattedName, repName, weightName) {
        state.error = null
        state.activeWorkout.map((workout, index) => {
            if (workout.numberSets === 0) {
                state.activeWorkout = state.activeWorkout.filter(name => name.formattedName !== formattedName)
            } else {
                delete workout.sets?.[`${repName}`]
                delete workout.sets?.[`${weightName}`]
            }
        })
    },
    saveSet(formattedName) {
        state.error = null
        state.activeWorkout.map((workout, index) => {
            if (workout.formattedName === formattedName) {
                workout.saved = true
            }
        })

    },
    unsaveSet(formattedName) {
        state.error = null
        state.activeWorkout.map((workout, index) => {
            if (workout.formattedName === formattedName) {
                workout.saved = false
            }
        })
    },
    async saveWorkout(user) {
        state.error = null
        try {
            const { displayName, email, uid } = user

            const workoutData = {
                displayName,
                email,
                uid,
                workout: state.activeWorkout
            }
    
            // const { displayName, email } = providerData
            const emptySets = state.activeWorkout.map(async (workout) => {
                if (!Object.values(workout.sets).includes(0)) {
                    return false
                } else {
                    return true
                }
            })

            if (!emptySets) {
                const response = await addDoc('userWorkout', workoutData)
            } else {
                throw new Error('Please fill in all rep and weight values.')
            }
        } catch (err) {
            state.error = err.message
        }
    },
    resetError() {
        state.error = null
    }

}

export default { state: readonly(state), methods}