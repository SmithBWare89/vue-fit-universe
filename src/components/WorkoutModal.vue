<template>
  <n-modal
    :show="modal.state.openModal"
    :mask-closable="true"
    title="Make Your Selection"
    class="workout-modal"
  >
    <n-space vertical> 
        <n-layout>
            <n-space vertical class="modal-control">
                <h1 class="modal-header">Select A Body Part</h1>
                <n-space>
                    <button class="save" @click="closeModal">Save / Exit</button>
                    <button class="clear" @click="clearWorkout">Clear Workout</button>
                </n-space>
            </n-space>
        </n-layout>
        <n-layout has-sider>
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="25"
                :width="250"
                :collapsed="collapsed"
                class="menu-sider"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
            >
            <n-menu 
                :collapsed="collapsed"
                :collapsed-width="100"
                :options="menuOptions"
                :value="activeKey"
                @update:value="handleSelection"
            />
            </n-layout-sider>
            <n-layout v-if="selectedMovement.length > 0" class="workout-display">
                <span v-for="exercise in selectedMovement" :key="exercise.id" :id="exercise.id">
                    <button @click="addMovement" class="movement-button">{{ exercise.name }}</button>
                </span>
            </n-layout>
        </n-layout>
    </n-space>

  </n-modal>
</template>

<script>
import { NSpace, NSwitch, NLayout, NLayoutSider, NMenu, NButton, NModal } from 'naive-ui'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
    name: 'WorkoutModal',
    components: { NSpace, NSwitch, NLayout, NLayoutSider, NMenu, NButton, NModal },
    setup() {
        // Variables
        const { modal, workouts } = inject('store')
        const collapsed = ref(false)
        const activeKey = ref(null)
        const selectedMovement = ref({})        
    
        // Menu Options
        const menuOptions = [
            {
                label: 'All',
                key: 'All'            
            },
            {
                label: 'Arms',
                key: 'Arms'            
            },
            {
                label: 'Back',
                key: 'Back'            
            },
            {
                label: 'Chest',
                key: 'Chest'            
            },
            {
                label: 'Core',
                key: 'Core'            
            },
            {
                label: 'Legs',
                key: 'Legs'            
            },
            {
                label: 'Neck',
                key: 'Neck'            
            },
            {
                label: 'Shoulders',
                key: 'Shoulders'            
            },
        ]

        // Functions
        const closeModal = () => {
            modal.methods.closeModal()
        }
        const clearWorkout = () => {
            workouts.methods.clearActiveWorkout()
        }

        const handleSelection = (key) => {
            switch (key) {
                 case "All":
                    selectedMovement.value = workouts.state.exercises
                    break;
                 case "Back":
                    selectedMovement.value = workouts.state.back
                    break;
                 case "Cardio":
                    selectedMovement.value = workouts.state.cardio
                    break;
                 case "Chest":
                    selectedMovement.value = workouts.state.chest
                    break;
                 case "Legs":
                    selectedMovement.value = workouts.state.legs
                    break;
                 case "Arms":
                    selectedMovement.value = workouts.state.arms
                    break;
                 case "Neck":
                    selectedMovement.value = workouts.state.neck
                    break;
                 case "Shoulders":
                    selectedMovement.value = workouts.state.shoulders
                    break;
                 case "Core":
                    selectedMovement.value = workouts.state.core
                    break;
                default:
                    selectedMovement.value = workouts.state.exercises
                    break;
            }
        }

        const addMovement = (e) => {
            const movement = e.target.innerHTML

            if (!Object.keys(workouts.state.activeWorkout).includes(movement)) {
                e.target.classList.remove("selected")
                workouts.methods.addToWorkout(movement)
            } else {
                e.target.classList.add("selected")
                workouts.methods.removeFromWorkout(movement)
            }
        }

        return { handleSelection, addMovement, selectedMovement, collapsed, menuOptions, modal, closeModal, clearWorkout, activeKey, handleSelection }
    }
}
</script>

<style>
    .workout-modal {
        width: 800px;
    }

    .workout-display {
        max-height: 400px;
        margin-left: 30px;
        margin-right: 30px;
        display: flex;
        flex-direction: column !important;
        flex-wrap: nowrap;
        margin-top: 15px;
        font-family: 'Fira Sans', sans-serif;
        overflow: auto;
    }

    /* .n-layout .n-layout-scroll-container {
        overflow-x: hidden;
    } */

    .modal-header {
        font-family: 'Fira Sans', sans-serif;
        margin-left: 5px;
        font-size: 35px;
        margin-bottom: 0px;
        margin-right: 5px;
        margin-top: 0px;
    }

    .movement-button {
        width: 100%;
        font-size: 20px;
    }

    .movement-button:hover {
        cursor: pointer;
        background-color: var(--white);
        color: var(--munsell);
    }

    .modal-control {
        margin-top: 10px;
        padding: 10px;
    }

    .save:hover, .clear:hover {
        background-color: var(--white);
        color: var(--munsell);
        cursor: pointer;
    }

    .selected {
        background: var(--white);
        color: var(--munsell);
    }

    /* Sidebar Menu Control */
    .n-layout-sider {
        font-family: 'Fira Sans', sans-serif;
        font-size: 30px !important;
    }

    /* Menu Sider Name List */
    .n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover .n-menu-item-content-header {
        color: var(--white);
    }

    /* Button Font-Size */
    .n-menu-item-content {
        font-size: 20px;
    }

    /* Save / Clear Modal Buttons */
    .save, .clear {
        background-color: var(--munsell);
        border-radius: 10px;
    }

    /* Sidebar Menu Item Hover */
    .n-menu-item-content:hover {
        background-color: var(--munsell);
    }

@media screen and (min-width: 600px) and (max-width: 900px) {
    .movement-button {
        width: 75%;
        font-size: 20px;
    }

    .workout-display {
        margin-left: 20px;
        margin-right: 15px;
        width: 400px;
    }
}

@media screen and (min-width: 300px) and (max-width: 599px)  {
    .workout-display {
        margin-left: 15px;
        margin-right: 10px;
        width: 400px;
    }

    .n-layout .n-layout--static-positioned .workout-display {
        width: 300px !important;
    }

    .movement-button {
        width: 190px;
        font-size: 18px !important;
    }

    .selected {
        width: 200px !important;
    }

    .n-layout-sider.n-layout-sider--bordered  {
        width: 150px !important;
    }
}
</style>