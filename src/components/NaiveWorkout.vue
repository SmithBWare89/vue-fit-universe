<template>
    <div v-if="Object.keys(workouts.state.activeWorkout).length >= 1" id="naive-workout">
        <n-grid :x-gap="12" :y-gap="8" :cols="1">
            <n-grid-item v-for="workout in workouts.state.activeWorkout" :key="workout.formattedName">
                <n-card :title="workout.name" size="large">
                    <template #header-extra>
                        <n-space>
                            <button class="add-set" ref="addSetButton" @click="addSet($event, workout.formattedName)">Add Set</button>
                            <button class="delete-set" @click="deleteSet($event, workout.formattedName, workout.numberSets)">Delete Set</button>
                        </n-space>
                    </template>
                    <n-space v-for="n in workout.numberSets" :key="n">
                        <n-space :inline="true" align="center">
                            <p>Set {{n}}</p>
                            <n-input-number 
                                @update:value="(value) => handleRepUpdate(value, workout.formattedName, n)"
                                size="small" 
                                placeholder="Reps" 
                                :min="1" 
                                :max="100" 
                            />
                            <n-input-number 
                                @update:value="(value) => handleWeightUpdate(value, workout.formattedName, n)" 
                                size="small" 
                                placeholder="Weight" 
                                :min="2" 
                                :max="500" 
                            />
                        </n-space>
                    </n-space>
                    <template #footer></template>
                    <template #action></template>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script>
import { NSpace, NCard, NGrid, NGridItem, NInputNumber, NDynamicInput } from 'naive-ui'
import { inject, ref } from '@vue/runtime-core'

export default {
    name: 'NaiveWorkout',
    components: { NCard, NSpace, NGrid, NGridItem, NInputNumber, NDynamicInput },
    setup() {
        const { workouts } = inject('store')
        const repName = ref('')
        const weightName = ref('')
        const repValue = ref(0)

        const addSet = async (e, formattedName, numberSets) => {
            // Increase the number of sets
            workouts.methods.increaseSets(formattedName)
            console.log(numberSets)

            const updatedNumberSets = await workouts.state.activeWorkout.map(workout => {
                if (workout.formattedName === formattedName) {
                    console.log(workout.numberSets)
                    return workout.numberSets
                }
            }).filter(result => result !== undefined)
            
            // Create variables to format the sets object name
            repName.value = `${formattedName}-${updatedNumberSets}-rep`
            weightName.value = `${formattedName}-${updatedNumberSets}-weight`

            // Add new set to the sets objects with correct numberSets
            await workouts.methods.addNewSet(repName.value, weightName.value, formattedName)
        }

        const deleteSet = (e, formattedName, numberSets) => {
            workouts.methods.decreaseSets(formattedName)

            repName.value = `${formattedName}-${numberSets}-rep`
            weightName.value = `${formattedName}-${numberSets}-weight`

            workouts.methods.deleteSet(formattedName, repName.value, weightName.value)
        }

        const handleRepUpdate = (value, formattedName, numberSets) => {
            repName.value = `${formattedName}-${numberSets}-rep`
            workouts.methods.updateReps(value, formattedName, repName.value)
        }

        const handleWeightUpdate = (value, formattedName, numberSets) => {
            weightName.value = `${formattedName}-${numberSets}-weight`
            workouts.methods.updateWeight(value, formattedName, weightName.value)
        }



        return { workouts, addSet, handleRepUpdate, handleWeightUpdate, deleteSet  }
    }
}
</script>

<style>
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
</style>