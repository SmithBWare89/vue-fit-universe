import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2TDaLv475v2g4m9YJDkljGdVLapS4KE8",
  authDomain: "fit-universe-224e7.firebaseapp.com",
  projectId: "fit-universe-224e7",
  storageBucket: "fit-universe-224e7.appspot.com",
  messagingSenderId: "264961524397",
  appId: "1:264961524397:web:098232f71e51a1425e7c24"
};

//   init firebase
firebase.initializeApp(firebaseConfig);
// set up auth capabilities
const projectAuth = firebase.auth();
// set up firestore instance
const projectFirestore = firebase.firestore();
// set up timestamp capabilities
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp }