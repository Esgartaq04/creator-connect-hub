import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);

// Auth variable handles login related stuff
export const auth = getAuth(app);

// Creates database for social media app
export const db = getFirestore(app);

console.log("This is my project shiii ", import.meta.env.VITE_FIREBASE_PROJECT_ID);


//This is that bridge that lets the frontend talk to the backend
export const getAuthToken = async () => {
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken(); 
  }
  return null;
};