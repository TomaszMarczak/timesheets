import { useContext, createContext, useState, useEffect } from "react";
import {
  loadUserId,
  loadUserName,
  saveUserName,
} from "../helpers/UserHandling";

interface UserContextTypes {
  userName: string;
  userId: string;
  setNewUserName: (name: string) => void;
}

const UserContext = createContext({} as UserContextTypes);

const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUserId().then((id) => {
      setUserId(id);
    });
    loadUserName().then((name) => {
      setUserName(name);
    });
    console.log("UserContext useEffect");
  }, []);

  const setNewUserName = (name: string) => {
    saveUserName(name).then((newName) => setUserName(newName));
  };

  return (
    <UserContext.Provider value={{ setNewUserName, userName, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserProvider };
