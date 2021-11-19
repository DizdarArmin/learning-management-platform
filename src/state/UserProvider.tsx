import { createContext, useContext, useState } from "react";
const [user, setUser] = useState({
  email: "armin.dizdar@gmail.com",
  password: "12345678",
});
const [isLogged, setIsLogged] = useState(false);

const UserContext = createContext({ user, setUser, isLogged, setIsLogged });

export function UserProvider({ children }) {
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
