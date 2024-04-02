import Axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

export const useAxios = () => {
  const { auth, clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const authHeader = () => {
    if (auth) {
      return {
        Authorization: `Bearer ${auth.token}`,
      };
    } else {
      return {};
    }
  };

  const axios = Axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  });

  const axiosErrHandler = (err: AxiosError | any) => {
    const msg = err?.response?.data?.message;
    const code = err?.response?.status;
    if (code === 401) {
      enqueueSnackbar(`Request Error: Blame Dev :| ${msg}`, {
        variant: "error",
      });
      navigate("/login");
    } else if (code === 403) {
      if (clearAuth) {
        clearAuth();
        navigate("/login");
      }
      enqueueSnackbar(`Login Expired`, {
        variant: "info",
      });
    } else if (msg) {
      enqueueSnackbar(msg, { variant: "error" });
    }
  };
  return { axios, axiosErrHandler };
};
export default useAxios;
