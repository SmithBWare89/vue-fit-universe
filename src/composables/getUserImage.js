import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const useGetUserImage = () => {
    const retrievedURL = ref(null)
    const error = ref(null)
    const filePath = ref(null)
    const { user } = getUser()

    const getUserImage = async () => {
        try {
            filePath.value = `userImage/${user.value.uid}`
            const storageRef = await projectStorage.ref(filePath.value)
            retrievedURL.value = await storageRef.getDownloadURL()

            console.log(retrievedURL.value)
        } catch (err) {
            error.value = err.message
        }
    }

    return { retrievedURL, error, getUserImage }
}

export default useGetUserImage