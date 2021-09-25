import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useUploadImage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `userImage/${user.value.uid}`
        const storageRef = projectStorage.ref(filePath.value)
        try {
            const response = await storageRef.put(file)
            url.value = await response.ref.getDownloadURL()
        } catch (err) {
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage }
}

export default useUploadImage