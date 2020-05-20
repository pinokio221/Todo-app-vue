import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWM21OWg5xQE0OvdHF7TBGzx53Ur_SFFo",
  authDomain: "todo-list-d57bd.firebaseapp.com",
  databaseURL: "https://todo-list-d57bd.firebaseio.com",
  projectId: "todo-list-d57bd",
  storageBucket: "todo-list-d57bd.appspot.com",
  messagingSenderId: "160728745980",
  appId: "1:160728745980:web:5dc507b31d6727f0439479",
  measurementId: "G-KX8GK96PYK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore()

firestore.settings({ timestampsInSnapshots: true })
export default firestore 