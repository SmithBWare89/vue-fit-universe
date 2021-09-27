import { projectFirestore } from '@/firebase/config'
import { ref } from '@vue/runtime-core'
import getUser from '@/composables/getUser'

const useGetWorkout = () => {
    const workoutData = ref([])
    const getWorkoutError = ref(null)
    const { user } = getUser()

    const getWorkout = async (uid) => {
        try {
            getWorkoutError.value = null

            const response = await projectFirestore.collection('savedWorkout').doc(uid).get()

            workoutData.value = response.data().workout

            if (workoutData.value.length === 0) {
                workoutData.value = null
                throw new Error('Please add a valid workout before saving.')
            }

        } catch (error) {
            getWorkoutError.value = error.message
        }
    }


    return { getWorkout, workoutData, getWorkoutError }
}

export default useGetWorkout