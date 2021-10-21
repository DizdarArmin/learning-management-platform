import { createContext, useContext, useEffect, useState } from "react";
import { authInstance } from "../scripts/firebase";
const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    email: "contact@armindizdar.com",
    password: 123456789,
  });

  useEffect(() => {
    console.log(authInstance.currentUser);
    authInstance.onAuthStateChanged(function (user) {
      if (user) {
        setUser(user);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
  }, []);

  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
