import { projectFirestore } from '@/firebase/config'
import { ref } from '@vue/runtime-core'
import getUser from '@/composables/getUser'

const useUpdateSavedWorkout = () => {
    const updatedWorkoutData = ref(null)
    const updatedWorkoutError = ref(null)
    const { user } = getUser()

    const updateSavedWorkout = async (workout) => {
        try {
            updatedWorkoutError.value = null

            const response = await projectFirestore.collection('savedWorkouts').where("uid", "==", user.value.uid).get(0)
            console.log(response)
            response.docs.map(doc => doc.set({
                ...doc.data(),
                workout
            }))

            // workoutData.value = response.docs.map(doc => {
            //     const {uid, workout} = doc.data()
            //     if (uid === user.value.uid) {
            //         return workout
            //     }
            // })

            // if (workoutData.value.length === 0) {
            //     workoutData.value = null
            //     throw new Error('Please add a valid workout before saving.')
            // }
        } catch (error) {
            updatedWorkoutError.value = error.message
        }
    }


    return { updateSavedWorkout, updatedWorkoutData, updatedWorkoutError }
}

export default useUpdateSavedWorkout