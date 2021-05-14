import firebase from 'firebase'
import 'firebase/database'; // If using Firebase database


var firebaseConfig = {
    apiKey: "AIzaSyCfwYvlK0ZHuqWdoSdubhED95l4jWYYomY",
    authDomain: "pocketrn-challenge.firebaseapp.com",
    projectId: "pocketrn-challenge",
    storageBucket: "pocketrn-challenge.appspot.com",
    messagingSenderId: "332883919571",
    appId: "1:332883919571:web:aba80d0e3a3db0545bca26",
    measurementId: "G-X4G94R9YFK"
  };
  
firebase.initializeApp(firebaseConfig);
export default firebase;

// const db=firebase.firestore();
// export default db;