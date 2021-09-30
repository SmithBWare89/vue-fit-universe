# [Fit Universe V1](https://github.com/SmithBWare89/vue-fit-universe) - [Deployed](https://fit-universe-224e7.web.app/)

## Description 
"Fit-Universe" was created to be a demonstration of Vue's `composition API`, state management capabilities with Vue version 3 `(provide/inject)`, and a way users can chat in
real time while also inputting their workout into the database.

---

## User Story
```
AS a person or influencer who values fitness, growth, and well-being
I WANT a platform that allows me to track my fitness, growth, and well-being
SO THAT I can share this information with like minded individuals across the globe in a social media setting directly within the app
```

---
## Built with 

* HTML5
* CSS
* JavaScript
* Vue (Version 3)
* Vue Router
* Naive UI (Vue 3 compatible component library)
* Firebase

---

## How It Works

### Dynamically Named Variables For Modeling
* Each workout that comes from the ExerciseDB API doesn't include a standardized formatting to their name. By increasing the number of sets for each movement, I needed to find
a method to create variable names that can be tracked and updated. In order to do this I had to first format every name using the `.replaceAll()` method to eliminate spaces and
special characters, the index or current number of sets, and whether the field was for a rep or weight.

#### [store/modules/workout.js](https://github.com/SmithBWare89/vue-fit-universe/blob/main/src/store/modules/workouts.js)
```
    addToWorkout(movement) {
        state.error = null
        state.ongoingWorkout = true
        <!-- Format the name -->
        const formattedName = movement.replaceAll(' ', '-').replaceAll('/','-').replaceAll('(','').replaceAll(')','')

        <!-- Push object into activeWorkout array -->
        state.activeWorkout.push({
            name: movement,
            formattedName: formattedName,
            numberSets: 1,
            sets: {},
            saved: false
        })
        
        <!-- Map over each movement in activeWorkout array -->
        state.activeWorkout.map(workout => {
            <!-- If the current workout's name matches the movement name sent from the front end -->
            if(workout.name === movement) {
                <!-- Format the rep and weight key's -->
                const repName = `${workout.formattedName}-${workout.numberSets}-rep`
                const weightName = `${workout.formattedName}-${workout.numberSets}-weight`
                
                <!-- Send formatted names to be added as a set -->
                methods.addNewSet(repName, weightName, formattedName)
            }
        })
    },
```

```
addNewSet(repName, weightName, formattedName) {
    state.error = null
    <!-- Find the matching movement in activeWorkout array -->
    state.activeWorkout.map(workout => {
        if (workout.formattedName === formattedName) {
            <!-- Add the formatted keys to the sets object -->
            workout.sets = { ...workout.sets, [`${repName}`]:  0}
            workout.sets = { ...workout.sets, [`${weightName}`]: 0}
        }
    })
},
```

```
updateReps(value, formattedName, repName) {
    state.error = null
    state.activeWorkout.map(workout => {
        if (workout.formattedName === formattedName) {
            workout.sets = {...workout.sets, [`${repName}`]: value}
        }
    })
},
```

### Component Setup
* `All components utilize the Vue 3 composition API` which uses the `setup()` function for the components logic.
* `Lifecycle hooks` exposed within the composition API are used to pre-load data prior to mounting the component for the user to see or to compute data for use within the component.
* Components utilize the `template ref` method to create references within the template that can be dynamically updated with state changes.

### API Call
* Workout movements are generated using the [ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) API provided on [RapidAPI](https://www.rapidapi.com).
* Clicking on a specific body part fetches data from the API and populates the results as clickable buttons to add a movement to your workout.

### Recyclable Functions
* In `/composables` lies functions that can be reused throughout the entire project. Each JavaScript file contains logic to perform either of the `CRUD` operations for the Firebase Firestore.

### Component Loading
* Main entry point for the application is the App.vue but the first page rended is the `Home` component.
* `Except for the home page, all components are lazy loaded` using a callback function that not only allows webpack to chunk the data for the component but to only load the component when routed to it.
* `Components beyond the login/signup screen require authentication` to be able to be displayed. `Authentication is provided by Firebase in firebase.config file.`

#### [src/router/index.js](https://github.com/SmithBWare89/vue-fit-universe/blob/main/src/router/index.js)
```
{
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue'),
    beforeEnter: requireNoAuth
},
{
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: requireAuth
},
```

### State Management
* State management is handled by using the Vue 3 `provide` and `inject` methods.
* The modules are provided within the `App.vue` setup functions which allows the store modules to be made available throughout the entirety of the project. Components will then `inject` the module from the store required for the component.
* In `/store` lies an `index.js` file which exports all of the "modules" that contain the local state for their area of the project as well as their own "methods."

```
provide('store', store)
```

### Storage
* Users are able to `upload` their own profile images to Firebase Storage. This data is persistent and will load whenever the user logs into their account.

#### [src/store/modules/profile.js](https://github.com/SmithBWare89/vue-fit-universe/blob/main/src/store/modules/profile.js)
```
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
```
* `Firebase's firestore` provides the storage required to save the chat comments as well as saving progress and the final workout version.
* By using the firestore, users are able to return to their previously left off workout whenever they return to the application.

---

## Difficulties
* Creating dynamic variable names for each set of a given exercise movement. Each time a user adds a new movement to their workout, the application generates a unique variable name to correspond to the input field and allows for `modeling` of data to be possible when updating the fields.
* Creating a unique identifier on the back end for each document in a collection prior to storing in the firestore.
* Creating CRUD operation methods for the application within current limitations.
* Limited API calls
* Limited Firebase read/writes

---

## Current Limitations
* Unable to return the values for a previously saved workout to the input fields `value` property. `Values are retained but not seen on the front end.`
* Resizing user avatar so that dimensions are not warped
* Not mobile responsive
* Only one chatroom field
