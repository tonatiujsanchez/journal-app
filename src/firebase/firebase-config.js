import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBvlgW2500wqTvxAJuHItaHMULhUNpIupk",
  authDomain: "journal-react-b3bbb.firebaseapp.com",
  projectId: "journal-react-b3bbb",
  storageBucket: "journal-react-b3bbb.appspot.com",
  messagingSenderId: "593792158372",
  appId: "1:593792158372:web:a49102b6964478f9933431"
};


firebase.initializeApp( firebaseConfig );


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}