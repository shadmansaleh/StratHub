import { createContext, useState } from "react";

export type GlobalCtxType = {
  sidebarKey?: string | null;
  user?: {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    username: string;
  };
};

type GlobalContextProps = {
  global: GlobalCtxType | null;
  setGlobal: ((global: GlobalCtxType) => void) | null;
};

export const GlobalContext = createContext<GlobalContextProps>({
  global: null,
  setGlobal: null,
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [global, setGlobal] = useState<GlobalCtxType>({});

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
