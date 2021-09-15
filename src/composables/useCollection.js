import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addDoc = async (collection, doc) => {
    error.value = null
    isPending.value = true

    try {
      await projectFirestore.collection(collection).add(doc)
      isPending.value = false
    }
    catch(err) {
      error.value = 'could not send the message'
      isPending.value = false
    }
  }

  const useCollection = () => {
    return { error, addDoc, isPending }
  }

export default useCollection