import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCb-IlblfgpeZK3q4fqSx3GGbBQ5LyGk-8",
    authDomain: "c0nn3ct3d-db162.firebaseapp.com",
    projectId: "c0nn3ct3d-db162",
    storageBucket: "c0nn3ct3d-db162.appspot.com",
    messagingSenderId: "372972818163",
    appId: "1:372972818163:web:22035cf6d40bd67a59f186",
  };
  
  const app = initializeApp(firebaseConfig);

  const db = getFirestore();

  const storage = getStorage();
  
  export default { db, storage, app };
