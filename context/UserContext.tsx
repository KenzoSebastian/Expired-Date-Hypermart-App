import { UserType } from "@/lib/api";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export type UserContextType = {
  user?: UserType;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
};

export const UserContext = createContext<UserContextType>({ user: undefined, setUser: () => {} });

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
