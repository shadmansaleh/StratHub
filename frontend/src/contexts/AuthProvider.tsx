import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSessionStorage from "../hooks/useSessionStorage";
import Axios from "axios";

export interface AuthCtxType {
  token: string;
  role: string;
}

interface AuthContextProps {
  auth: AuthCtxType | null;
  setAuth: ((auth: AuthCtxType, ephemeral?: boolean) => void) | null;
  clearAuth: (() => void) | null;
}

export const AuthContext = createContext<AuthContextProps>({
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
    const axios = Axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    });
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
