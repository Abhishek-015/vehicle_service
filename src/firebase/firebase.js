import firebase from 'firebase/compat/app';  //get the functionality of that firebase library
import 'firebase/compat/firestore';          //get the database
import 'firebase/compat/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyBxdQoZ9PtqkBnVIdqWDbpU91jNR3wrDq8",
    authDomain: "vehicle-service-ad053.firebaseapp.com",
    projectId: "vehicle-service-ad053",
    storageBucket: "vehicle-service-ad053.appspot.com",
    messagingSenderId: "895921245536",
    appId: "1:895921245536:web:8a0431a1cb9bb266702205"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider  = new firebase.auth.GoogleAuthProvider()