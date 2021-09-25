import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import store from '../store/index'

const error = ref(null)
const { navbar } = store

const logout = async () => {
    error.value = null
    try {
        // Sign out using Firebase function
        const response = await projectAuth.signOut()        
        error.value = false
        return response
    } catch (err) {
        error.value = err.message
    }
}


const useLogout = () => {
    return { error, logout}
}

export default useLogout 