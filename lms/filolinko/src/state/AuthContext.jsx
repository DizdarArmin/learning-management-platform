import { useContext, createContext, useState, useEffect } from "react";
import { createAccount } from "../scripts/authentication";
import { authInstance } from "../scripts/firebase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email, password) {
    return createAccount(email, password);
  }
  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
