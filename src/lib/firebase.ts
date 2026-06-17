import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAmSfXHMuK-zTR9zI74PAuzs7LLMSw7CwU",
  authDomain: "charismatic-muse-xxqhd.firebaseapp.com",
  projectId: "charismatic-muse-xxqhd",
  storageBucket: "charismatic-muse-xxqhd.firebasestorage.app",
  messagingSenderId: "204668785267",
  appId: "1:204668785267:web:e880e127bd9d5fb0ed9006"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
