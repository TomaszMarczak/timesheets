import { useContext, createContext, useState, useEffect } from "react";
import {
  loadUserId,
  loadUserName,
  saveUserName,
} from "../helpers/UserHandling";
import { z } from "zod";

const zUserName = z
  .string()
  .min(1)
  .max(20)
  .regex(/^(?!.*\s{2})[A-Za-z\s]+$/);
const zUserId = z.string().uuid();

interface UserContextTypes {
  userName: z.infer<typeof zUserName>;
  userId: z.infer<typeof zUserId>;
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

  useEffect(() => {
    loadUserId().then((id) => {
      setUserId(id);
    });
    loadUserName().then((name) => {
      setUserName(name);
    });
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
