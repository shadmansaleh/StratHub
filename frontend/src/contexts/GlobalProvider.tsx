import { createContext, useState } from "react";

export interface GlobalCtxType {
  sidebarKey: string | null;
}

interface GlobalContextProps {
  global: GlobalCtxType | null;
  setGlobal: ((global: GlobalCtxType) => void) | null;
}

export const GlobalContext = createContext<GlobalContextProps>({
  global: null,
  setGlobal: null,
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [global, setGlobal] = useState<GlobalCtxType>({ sidebarKey: null });

  return (
    <GlobalContext.Provider value={{ global, setGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
