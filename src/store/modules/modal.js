import { reactive, readonly } from 'vue'
import workouts from './workouts'

const state = reactive({
    openModal: false
})

const methods = {
    openModal() {
        workouts.methods.resetError()
        state.openModal = true
    },
    closeModal() {
        state.openModal = false
    },
}

export default { state: readonly(state), methods}