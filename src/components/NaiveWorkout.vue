<template>
<!-- Check if there if the activeWorkout array has anything -->
    <div v-if="Object.keys(workouts.state.activeWorkout).length >= 1" id="naive-workout">
        <n-grid :x-gap="12" :y-gap="8" :cols="1">
            <!-- For each workout in workouts -->
            <n-grid-item v-for="workout in workouts.state.activeWorkout" :key="workout.formattedName">
                <!-- Create a car to represent each workout movement -->
                <n-card :title="workout.name" size="large">
                    <template #header-extra>
                        <n-space>
                            <!-- Add Button -->
                            <button v-if="workout.saved" class="add-set" disabled>Add Set</button>
                            <button class="add-set" ref="addSetButton" @click="addSet($event, workout.formattedName)" v-else>Add Set</button>
                            <!-- Delete Button -->
                            <button v-if="workout.saved" class="delete-set" disabled>Delete Set</button>
                            <button class="delete-set" @click="deleteSet($event, workout.formattedName, workout.numberSets)" v-else>Delete Set</button>
                        </n-space>
                    </template>
                    <n-space v-for="n in workout.numberSets" :key="n">
                        <!-- Rep Input -->
                        <n-space align="center">
                            <p>Set {{n}}</p>
                            <n-input-number 
                                @update:value="(value) => handleRepUpdate(value, workout.formattedName, n)"
                                size="small" 
                                placeholder="Reps" 
                                :min="1" 
                                :max="100"
                            />
                            <!-- Weight Input -->
                            <n-input-number 
                                @update:value="(value) => handleWeightUpdate(value, workout.formattedName, n)" 
                                size="small" 
                                placeholder="Weight" 
                                :min="2" 
                                :max="500"
                            />
                        </n-space>
                    </n-space>
                    <!-- <template #footer>
                        
                    </template> -->
                    <template #footer style="padding: 0px 0px !important;">
                        <!-- Save Button -->
                        <button class="saved" v-if="workout.saved" @click.prevent="workouts.methods.unsaveSet(workout.formattedName)">Saved</button>
                        <button class="save-progress" v-else @click.prevent="workouts.methods.saveSet(workout.formattedName)">Save Progress</button>
                    </template>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script>
import { NSpace, NCard, NGrid, NGridItem, NInputNumber, NDynamicInput, NSelect } from 'naive-ui'
import { inject, onBeforeMount, ref } from '@vue/runtime-core'

export default {
    name: 'NaiveWorkout',
    components: { NCard, NSpace, NGrid, NGridItem, NInputNumber, NDynamicInput, NSelect },
    setup() {
        const { workouts } = inject('store')
        const repName = ref('')
        const weightName = ref('')
        const value = ref('')

        // Add a set logic
        const addSet = async (e, formattedName) => {
            // Increase the number of sets
            workouts.methods.increaseSets(formattedName)

            // Obtain the updated number of sets for the movement
            const updatedNumberSets = await workouts.state.activeWorkout.map(workout => {
                if (workout.formattedName === formattedName) {
                    return workout.numberSets
                }
            }).filter(result => result !== undefined)
            
            // Create variables to format the sets object name
            repName.value = `${formattedName}-${updatedNumberSets}-rep`
            weightName.value = `${formattedName}-${updatedNumberSets}-weight`

            // Add new set to the sets objects with the correct numberSets
            await workouts.methods.addNewSet(repName.value, weightName.value, formattedName)
        }

        const deleteSet = (e, formattedName, numberSets) => {
            // Decrease the number of sets for the movement
            workouts.methods.decreaseSets(formattedName)

            // Format the rep and weight value name
            repName.value = `${formattedName}-${numberSets}-rep`
            weightName.value = `${formattedName}-${numberSets}-weight`

            // Delete them from the workout
            workouts.methods.deleteSet(formattedName, repName.value, weightName.value)
        }

        const handleRepUpdate = (value, formattedName, numberSets) => {
            // Format the rep field name
            repName.value = `${formattedName}-${numberSets}-rep`
            // Update the values
            workouts.methods.updateReps(value, formattedName, repName.value)
        }

        const handleWeightUpdate = (value, formattedName, numberSets) => {
            // Format the weight field name
            weightName.value = `${formattedName}-${numberSets}-weight`
            // Update the values
            workouts.methods.updateWeight(value, formattedName, weightName.value)
        }

        return { workouts, addSet, handleRepUpdate, handleWeightUpdate, deleteSet, value  }
    }
}
</script>

<style scoped>
    #naive-workout {
        margin: 0 auto;
    }
    .n-card > .n-card-header {
        font-size: 18px;
    }

    /* Set Card Dimensions */
    .n-card.n-card--bordered {
        width: 600px;
        margin: 0 auto;
        box-shadow: 5px 5px var(--beau);
        border-radius: 10px;
    }

    /* Card Action Area Style */ 
    .n-card > .n-card__action {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    /* Input Placeholder */
    .n-input .n-input__input-el, .n-input .n-input__textarea-el, .n-input .n-input__input-mirror, .n-input .n-input__textarea-mirror, .n-input .n-input__separator, .n-input .n-input__placeholder {
        font-size: 12px !important;
    }

    .n-input-wrapper:hover {
        border-color: var(--munsell) !important;
    }

    .save-progress {
        width: 100%;
        height: 100%;
        padding: 15px;
        font-size: 1.15rem;
    }

    .save-progress:hover {
        background-color: var(--white);
        color: var(--munsell);
        cursor: pointer;
    }

    .saved {
        background-color: var(--green);
        color: var(--white);
        width: 100%;
        height: 100%;
        padding: 15px;
        font-size: 1.15rem;
    }

    .saved:hover {
        background-color: var(--white);
        color: var(--green);
    }

    .delete-set {
        background-color: var(--red);
        color: var(--white);
        margin-left: 5px;
    }

    .delete-set:hover{
        background-color: var(--white);
        color: var(--red);
        cursor: pointer;
    }

    .add-set {
        background-color: var(--green);
        color: var(--white);
    }

    .add-set:hover {
        background-color: var(--white);
        color: var(--green);
        cursor: pointer;
    }

    .add-set:disabled {
        cursor: not-allowed;
        background-color: var(--green);
        color: var(--white);
    }

    .delete-set:disabled {
        cursor: not-allowed;
        background-color: var(--red);
        color: var(--white);
    }
</style>