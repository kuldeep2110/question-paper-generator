import React, { FC, useContext, useState, ReactNode, useEffect } from "react";
import { auth } from "../config";
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User as FirebaseUser,
} from "firebase/auth";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  currentUser: FirebaseUser | undefined;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue>({
  currentUser: undefined,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
});

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | undefined>();
  const [loading, setLoading] = useState(true);

  console.log("currentUser", currentUser);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextValue = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
