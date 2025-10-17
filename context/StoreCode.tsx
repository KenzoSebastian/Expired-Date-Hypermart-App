import { numberSplit } from "@/utils/numberSplit";
import { useUser } from "@clerk/clerk-expo";
import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

export type StoreCodeContextType = {
  storeCode?: number;
  setStoreCode: Dispatch<SetStateAction<number | undefined>>;
};

const StoreCodeContext = createContext<StoreCodeContextType | null>(null);

const StoreCodeContextProvider = ({ children }: { children: ReactNode }) => {
  const [storeCode, setStoreCode] = useState<number | undefined>(undefined);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const code = numberSplit(user?.emailAddresses[0]?.emailAddress || "");
    setStoreCode(Number(code));
  }, [user]);

  return (
    <StoreCodeContext.Provider value={{ storeCode, setStoreCode }}>{children}</StoreCodeContext.Provider>
  );
};

export const StoreCode = StoreCodeContext;
export default StoreCodeContextProvider;
