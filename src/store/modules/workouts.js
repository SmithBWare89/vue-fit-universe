import { startOfMinute, startOfQuarter, startOfSecond, startOfWeek } from 'date-fns'
import { reactive, readonly } from 'vue'
import useCollection from '@/composables/addDocument.js'
import getUser from '../../composables/getUser'
import useUpdateSavedWorkout from '@/composables/updateWorkout'

const { addDoc } = useCollection()
const { user } = getUser()
const { updateSavedWorkout, updatedWorkoutData, getWorkoutError } = useUpdateSavedWorkout()

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
    ongoingWorkout: false,
    savedWorkout: false
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
        state.ongoingWorkout = true
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
        state.ongoingWorkout = false
        state.error = null
        state.modalDisplay = false
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

        if(state.activeWorkout.length === 0) {
            state.ongoingWorkout = false
        }
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
                workout.sets = {...workout.sets, [`${repName}`]: value}
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
    async saveProgress() {
        try {
            if (!state.savedWorkout) {
                // Add data to firestore
                const data = { workout: state.activeWorkout, uid: user.value.uid }
                await addDoc('savedWorkouts', data)
                state.savedWorkout = true
                state.error = null
            }
        } catch (err) {
            state.error = err.message
        }
    },
    async updateProgress() {
        try {
            await updateSavedWorkout(state.activeWorkout)
        } catch (err) {
            state.error = err.message
        }
    },
    async deleteSavedProgress() {
        
    },
    async saveWorkout(user) {
        state.error = null
        try {
            const { displayName, email, uid } = user
            console.log(displayName)
            console.log(email)
            console.log(uid)

            const workoutData = {
                displayName,
                email,
                uid,
                workout: state.activeWorkout
            }

            const emptySets = state.activeWorkout.map(workout => {
                if (Object.values(workout.sets).includes(0)) {
                    return true
                } else {
                    return false
                }
            })

            if (!emptySets) {
                await addDoc('savedWorkouts', workoutData)
                methods.clearActiveWorkout()
            } else {
                throw new Error('Please fill in all rep and weight values.')
            }
        } catch (err) {
            state.error = err.message
        }
    },
    resetError() {
        state.error = null
    },
    setSavedProgress(workout) {
        state.savedWorkout = true
        workout.forEach(data => state.activeWorkout = data)
    }
}

export default { state: readonly(state), methods}