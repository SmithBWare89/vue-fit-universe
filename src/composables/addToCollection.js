import { ref } from "@vue/runtime-dom";
import { projectFirestore } from "../firebase/config";

const error = ref(null)

const addToCollection = async (collection, comment) => {
    try {
        // Take in the comment context object from NewChat.vue and add to collection
       await projectFirestore.collection(collection).add(comment)
    } catch (err) {
        error.value = err.message
    }
}

// Function to return error and newComment for practical use
const useAddToCollection = () => {
    return { error, addToCollection }
}

export default useAddToCollection