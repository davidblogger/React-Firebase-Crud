import firebase from 'firebase/app';
import 'firebase/firestore';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAtrajmZnVwVQ5Ezxfxn9B4b1-d5yWD97E",
    authDomain: "fb-crud-react-c8779.firebaseapp.com",
    projectId: "fb-crud-react-c8779",
    storageBucket: "fb-crud-react-c8779.appspot.com",
    messagingSenderId: "318038498180",
    appId: "1:318038498180:web:024089171f8485d8b61bd1"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);

  export const db = fb.firestore();
