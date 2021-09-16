import { reactive, readonly } from 'vue'
    
const state = reactive({
    isPending: false
})

const methods = {
    setPending(pending) {
        return state.isPending = pending
    }
}


export default { state: readonly(state), methods }