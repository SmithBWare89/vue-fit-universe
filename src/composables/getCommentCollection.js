import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCommentCollection = (collection) => {

  const documents = ref(null)
  const error = ref(null)

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

  const unsub = collectionRef.onSnapshot(snap => {
    let results = []
    snap.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back
      doc.data() && results.push({...doc.data(), id: doc.id})
    });
    
    // update values
    documents.value = results
    error.value = null
  }, err => {
    documents.value = null
    error.value = 'could not fetch the data'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents }
}

export default getCommentCollection