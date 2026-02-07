import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore"; //This is to add user data to database


//Defining what data we have avaliable... so this is the pipe
interface AuthContextValue {
  user: User | null; //Firebase user here
  isLoading: boolean;
  register: (email: string, password: string, first_name: string, last_name: string, phone_number: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

//The "memory" for the website, this will make the user stay logged in or out of their account
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // 'user' is the Firebase object
  const [isLoading, setIsLoading] = useState(true); // 'isLoading' prevents the app from getting out of current login session
useEffect(() => {
    // This function watches for changes (Login, Logout, or Page Refresh)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Updates with user or null
      setIsLoading(false);   // Stop showing the loading spinner
    });

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

      //They need a creators profile, so we make a new one for them
      await setDoc(doc(db, "creators", uid), {
      name: `${first_name} ${last_name}`,
      bio: "New creator on the platform!",
      niche: [],
      level: 1,
      levelName: "Newcomer", // Standard starting level
      stats: { avgViews: 0, engagementRate: 0, totalFollowers: 0 }
      });

      //We also add a new data for their analytics standing
      await setDoc(doc(db, "analytics", uid), {
      weeklyViews: [],
      growthTrend: [],
      insights: []
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
  }

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