import { initializeApp } from "firebase/app";
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCb-IlblfgpeZK3q4fqSx3GGbBQ5LyGk-8",
    authDomain: "c0nn3ct3d-db162.firebaseapp.com",
    projectId: "c0nn3ct3d-db162",
    storageBucket: "c0nn3ct3d-db162.appspot.com",
    messagingSenderId: "372972818163",
    appId: "1:372972818163:web:22035cf6d40bd67a59f186",
    measurementId: "G-JCHX5305NC"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore();
  
  export default db;
