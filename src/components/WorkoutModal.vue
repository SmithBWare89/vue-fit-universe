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
import { NSpace, NSwitch, NLayout, NLayoutSider, NMenu, NButton, NModal, NCard, NTabs, NTabPane } from 'naive-ui'
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'
export default {
    name: 'WorkoutModal',
    components: { NSpace, NSwitch, NLayout, NLayoutSider, NMenu, NButton, NModal, NCard, NTabs, NTabPane },
    setup() {
        // Variables
        const { modal, workouts } = inject('store')
        const collapsed = ref(false)
        const activeKey = ref(null)
        const selectedMovement = ref({})        
    
        // Menu Options
        const menuOptions = [
            {
                label: 'Ankles/Calves',
                key: 'Ankles/Calves'            
            },
            {
                label: 'Bicep/Tricep/Shoulder',
                key: 'Bicep/Tricep/Shoulder'            
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
                label: 'Cardio',
                key: 'Cardio'            
            },
            {
                label: 'Core',
                key: 'Core'            
            },
            {
                label: 'Quad/Hamstring/Glutes',
                key: 'Quad/Hamstring/Glutes'            
            },
            {
                label: 'Neck',
                key: 'Neck'            
            },
            {
                label: 'Shoulders',
                key: 'Shoulders'            
            },
            {
                label: 'Wrist/Forearm',
                key: 'Wrist/Forearm'            
            },
        ]

        // Functions
        const closeModal = () => {
            modal.methods.closeModal()
        }
        const clearWorkout = () => {
            workouts.methods.clearActiveWorkout()
        }

        const handleSelection = async (key) => {
            switch (key) {
                 case "Back":
                    selectedMovement.value = await workouts.methods.getExercises('back')
                    break;
                 case "Cardio":
                    selectedMovement.value = await workouts.methods.getExercises('cardio')
                    break;
                 case "Chest":
                    selectedMovement.value = await workouts.methods.getExercises('chest')
                    break;
                 case "Quad/Hamstring/Glutes":
                    selectedMovement.value = await workouts.methods.getExercises('upper%20legs')
                    break;
                 case "Ankles/Calves":
                    selectedMovement.value = await workouts.methods.getExercises('lower%20legs')
                    break;
                 case "Bicep/Tricep/Shoulder":
                    selectedMovement.value = await workouts.methods.getExercises('upper%20arms')
                    break;
                 case "Wrist/Forearm":
                    selectedMovement.value = await workouts.methods.getExercises('lower%20arms')
                    break;
                 case "Neck":
                    selectedMovement.value = await workouts.methods.getExercises('back')
                    break;
                 case "Shoulders":
                    selectedMovement.value = await workouts.methods.getExercises('shoulders')
                    break;
                 case "Core":
                    selectedMovement.value = await workouts.methods.getExercises('waist')
                    break;
                default:
                    selectedMovement.value = await workouts.methods.getExercises('back')
                    break;
            }
        }

        const addMovement = (e) => {
            const movement = e.target.innerHTML

            if (!Object.keys(workouts.state.activeWorkout).includes(movement)) {
                e.target.classList.add("selected")
                workouts.methods.addToWorkout(movement)
            } else {
                e.target.classList.remove("selected")
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
        max-height: 450px;
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
        font-size: 16px;
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
    }

    /* Menu Sider Name List */
    .n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover .n-menu-item-content-header {
        color: var(--white);
    }

    /* Button Font-Size */
    .n-menu-item-content {
        font-size: 18px;
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