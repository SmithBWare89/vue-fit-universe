# [Fit Universe V1](https://github.com/SmithBWare89/vue-fit-universe) - [Deployed](https://fit-universe-224e7.web.app/)

## Description 
"Fit-Universe" was created to be a demonstration of Vue's composition API, state management capabilities with Vue version 3 (project/inject), and a way users can chat in
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

### Component Setup
* `All components utilize the Vue 3 composition API` which allows all logic and life cycle hooks to be stored within the `setup()` function.
* `Lifecycle hooks` exposed within the composition API are used to pre-load data prior to mounting the component for the user to see or to compute data for use within the component.
* Components utilize the `template ref` method to create references within the template that can be dynamically updated with state changes.

### Recyclable Functions
* In `/composables` lies functions that can be reused throughout the entire project. Each JavaScript file contains logic to perform either of the `CRUD` operations for the Firebase Firestore.

### Component Loading
* Main entry point for the application is the App.vue but the first page rended is the `Home` component.
* `Except for the home page, all components are lazy loaded` using a callback function that not only allows webpack to chunk the data for the component but to only load the component when routed to it.
* `Components beyond the login/signup screen require authentication` to be able to be displayed. `Authentication is provided by Firebase in firebase.config file.`

### State Management
* State management is handled by using the Vue 3 `provide` and `inject` methods.
* The modules are provided within the `App.vue` setup functions which allows the store modules to be made available throughout the entirety of the project. Components will then `inject` the module from the store required for the component.
* In `/store` lies an `index.js` file which exports all of the "modules" that contain the local state for their area of the project as well as their own "methods."

### Storage
* Users are able to `upload` their own profile images to Firebase Storage. This data is persistent and will load whenever the user logs into their account.
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
