import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
<<<<<<< Updated upstream
=======
import { getFirestore } from "firebase/firestore";
>>>>>>> Stashed changes

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
<<<<<<< Updated upstream
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
};
=======
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);

// Auth variable handles login related stuff
export const auth = getAuth(app);

// Creates database for social media app
export const db = getFirestore(app);

console.log("This is my project shiii ", import.meta.env.VITE_FIREBASE_PROJECT_ID);
>>>>>>> Stashed changes
