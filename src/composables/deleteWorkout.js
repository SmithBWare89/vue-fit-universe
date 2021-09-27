import { projectFirestore } from '@/firebase/config'
import { ref } from '@vue/runtime-core'
import getUser from '@/composables/getUser'

const useDeleteWorkout = () => {
    const error = ref(null)

    const deleteWorkout = async (uid) => {
        try {
            error.value = null
            const response = await projectFirestore.collection('savedWorkout').doc(uid).delete()             
        } catch (err) {
            error.value = err.message
        }       
    }

    return { deleteWorkout, error}
}

export default useDeleteWorkout