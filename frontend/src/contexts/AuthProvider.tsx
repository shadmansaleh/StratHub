import { createContext, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import useSessionStorage from "@/hooks/useSessionStorage";
import Axios from "axios";
import Cookies from "js-cookie";

export interface AuthCtxType {
  token: string | null;
  role: string | null;
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

  const setAuthWrapped = ({ token, role }: AuthCtxType) => {
    setAuth({ token, role });
    if (auth.token) Cookies.set("token", auth.token, { path: "/" });
    else Cookies.remove("token", { path: "/" });
  };

  if (auth.token) Cookies.set("token", auth.token, { path: "/" });
  else Cookies.remove("token", { path: "/" });

  const authorize = ({ token, role }: AuthCtxType, ephemeral = false) => {
    setAuthWrapped({ token, role });
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
    axios.delete("/auth/logout").catch(console.error);
    setAuthWrapped({ token: null, role: null });
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
