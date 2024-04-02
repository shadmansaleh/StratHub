import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionStorage from "../hooks/useSessionStorage";
import { axios } from "../utils/axios";

export interface AuthCtxType {
  token: string;
  role: string;
}

export const AuthContext = createContext<{
  auth: AuthCtxType | null;
  setAuth: ((auth: AuthCtxType, ephemeral?: boolean) => void) | null;
  clearAuth: (() => void) | null;
}>({
  auth: null,
  setAuth: null,
  clearAuth: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [lsAuth, setLsAuth] = useLocalStorage("auth");
  const [ssAuth, setSsAuth] = useSessionStorage("auth");

  const [auth, setAuth] = useState(
    lsAuth || ssAuth || { token: null, role: null }
  );

  const authorize = ({ token, role }: AuthCtxType, ephemeral = false) => {
    clearAuth();
    setAuth({ token, role });
    if (!ephemeral) {
      setLsAuth({ token, role });
      setSsAuth(null);
    } else {
      setLsAuth(null);
      setSsAuth({ token, role });
    }
  };

  const clearAuth = () => {
    axios.delete("/user/logout").catch(console.error);
    setAuth({ token: null, role: null });
    setSsAuth(null);
    setLsAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: authorize, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
