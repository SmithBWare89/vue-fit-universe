import { read } from '@popperjs/core'
import { reactive, readonly } from 'vue'

const state = reactive({
    openModal: false
})

const methods = {
    openModel() {
        state.openModal = true
    },
    closeModal() {
        state.openModal = false
    }
}

export default { state: readonly(state), methods}