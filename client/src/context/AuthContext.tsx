import { createContext, useContext, useEffect, useMemo, useState } from "react";
<<<<<<< Updated upstream
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, getAuthToken } from "@/lib/firebase";
import {
  fetchUserProfile,
  updateUserProfile,
  type UpdateUserProfileInput,
} from "@/services/userService";

interface AuthUser {
  id: string;
  email: string | null;
  creatorId: string | null;
}
=======
import { auth, db } from "@/lib/firebase";
import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"; //This is to add user data to database
>>>>>>> Stashed changes


//Defining what data we have avaliable... so this is the pipe
interface AuthContextValue {
  user: User | null; //Firebase user here
  isLoading: boolean;
  register: (email: string, password: string, first_name: string, last_name: string, phone_number: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
<<<<<<< Updated upstream
  register: (
    email: string,
    password: string,
    profile: UpdateUserProfileInput
  ) => Promise<void>;
=======
>>>>>>> Stashed changes
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

<<<<<<< Updated upstream
=======
//The "memory" for the website, this will make the user stay logged in or out of their account
>>>>>>> Stashed changes
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // 'user' is the Firebase object
  const [isLoading, setIsLoading] = useState(true); // 'isLoading' prevents the app from getting out of current login session
useEffect(() => {
    // This function watches for changes (Login, Logout, or Page Refresh)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Updates with user or null
      setIsLoading(false);   // Stop showing the loading spinner
    });

<<<<<<< Updated upstream
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const token = await firebaseUser.getIdToken();
        const profile = await fetchUserProfile(token);
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          creatorId: profile.creatorId ?? null,
        });
      } catch (error) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          creatorId: null,
        });
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const token = await credentials.user.getIdToken();
    const profile = await fetchUserProfile(token);
    setUser({
      id: credentials.user.uid,
      email: credentials.user.email,
      creatorId: profile.creatorId ?? null,
    });
  };

  const register = async (
    email: string,
    password: string,
    profile: UpdateUserProfileInput
  ) => {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await credentials.user.getIdToken();
    await updateUserProfile(token, profile);
    const updatedProfile = await fetchUserProfile(token);
    setUser({
      id: credentials.user.uid,
      email: credentials.user.email,
      creatorId: updatedProfile.creatorId ?? null,
    });
  };

  const logout = () => {
    signOut(auth).catch(() => {});
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
=======
    return () => unsubscribe(); // Safety guard: closes when the app closes
  }, []);

  const login = async (email: string, password: string) => {
    //Try and catch blocks are very important to check for login issues
    try{
      //signIn function sponsored by your local neighborhood firebase/auth library :)
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign in was successful!");
    }
    catch(error: any){
      console.error("Login Error:", error.code, error.message);
      throw error;
    }
  };

  const register = async (email: string, password: string, first_name: string, last_name: string, phone_number: string) => {
    try{
      //Make a user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      //we bagged that UID for the user
      const uid = userCredential.user.uid;

      //Create a place to dump user data into database
      await setDoc(doc(db, "users", uid), {
        first_name,
        last_name,
        email,
        phone_number,
        createdAt: new Date().toISOString()
      });

      console.log("User was created into database! Welcome :)");
    } catch (error: any) {
    console.error("NOOO... Registration failed:", error.message);
    throw error;
    }
  };

  const logout = () => {
    try{
      signOut(auth);
      console.log("Sign-out sucessful! Now get out");
    }
    catch (error: any){
      console.error("Signout failed:", error.message);
      throw error;
    }
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
export { getAuthToken };
=======
  return (
      // We pour in our state and the functions into the 'value' variable
      <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
        {children} 
      </AuthContext.Provider>
    );
  }
  
  export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
>>>>>>> Stashed changes
