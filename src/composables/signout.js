import { ref } from 'vue';
import { projectAuth } from '../firebase/config';
import store from '../store/index'

const error = ref(null)
const { navbar } = store

const logout = async () => {
    error.value = null
    try {
        // Sign out using Firebase function
        // await projectAuth.signOut()
        navbar.methods.setPending(true)
    } catch (err) {
        error.value = err.message
        navbar.methods.setPending(false)
    }
}


const useLogout = () => {
    return { error, logout}
}

export default useLogout 