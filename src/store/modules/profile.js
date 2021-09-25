import { reactive, readonly } from 'vue'
import { projectStorage, projectAuth } from '@/firebase/config.js'
import getUser from '@/composables/getUser.js'

const { user } = getUser()

const state = reactive({
    editUsername: false,
    editEmail: false,
    editPassword: false,
    isPending: false,
    url: null,
    filePath: null,
    error: null
})

const methods = {
    async editUserName() {
        state.editUsername = !state.editUsername
    },
    async editEmail() {
        state.editEmail = !state.editEmail
    },
    async editPassword() {
        state.editPassword = !state.editPassword
    },
    async updateEmail(email) {
        try {
            state.isPending = true
            await projectAuth.currentUser.updateEmail(email)
            state.isPending = false
        } catch (err) {
            setTimeout(() => {
                state.error = err.message
            }, 1000 * 5)
            state.error = null
        }
    },
    async updatePassword(password) {
        try {
            state.isPending = true
            await projectAuth.currentUser.updatePassword(password)
            state.isPending = false
        } catch (err) {
            setTimeout(() => {
                state.error = err.message
            }, 1000 * 5)
            state.error = null
        }
    },
    async updateUsername(username) {
        try {
            console.log(username)
            state.isPending = true
            await projectAuth.currentUser.updateProfile({
                displayName: username
            })
            state.isPending = false
            methods.editUserName()
        } catch (err) {
            setTimeout(() => {
                state.error = err.message
            }, 1000 * 5)
            state.error = null
        }
    },
    async getUserImage() {
        try {
            state.filePath = `userImage/${user.value.uid}`
            const storageRef = await projectStorage.ref(state.filePath)
            state.url = await storageRef.getDownloadURL()
            state.error = null
        } catch (err) {
            console.log(err)
        }
    },
    async uploadImage(file) {
        try {
            state.filePath = `userImage/${user.value.uid}`
            const storageRef = projectStorage.ref(state.filePath)
            const response = await storageRef.put(file)
            state.url = await response.ref.getDownloadURL()
            state.error = null
        } catch (err) {
            setTimeout(() => {
                state.error = err.message
            }, 1000 * 5)
            state.error = null
        }
    },
    async deleteUser() {
        try {
            state.isPending = true
            await projectAuth.currentUser.delete()
            state.isPending = false
        } catch (err) {
            console.log(err.message)
            setTimeout(() => {
                state.error = err.message
            }, 1000 * 5)
            state.error = null
        }
    }
}

export default { state: readonly(state), methods }