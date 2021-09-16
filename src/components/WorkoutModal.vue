<template>
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
    </div>

    </div>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
    name: 'WorkoutModal',
    setup() {
        const store = inject('store')
        console.log(store)
        const { workouts } = store
    }
}
</script>

<style>

</style>