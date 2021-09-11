import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    isPending.value = true
    try {
        // Sign out using Firebase function
        await projectAuth.signOut()
        isPending.value = false
    } catch (err) {
        error.value = err.message
        isPending.value = false
    }
}


const useLogout = () => {
    return { error, logout, isPending}
}

export default useLogout 