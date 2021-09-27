import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'

const useAddPendingWorkout = () => {
    const error = ref(null)
    const isPending = ref(null)

    const addPendingWorkout = async (collection, uid, data) => {
        try {
            const response = await projectFirestore.collection(collection).doc(uid).set(data)
            isPending.value = false
            return response
        } catch (err) {
            error.value = err.message
        }
    }

    return { error, isPending, addPendingWorkout }
}

export default useAddPendingWorkout