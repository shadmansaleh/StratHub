import Axios from "axios";

const authHeader = () => {
  let auth = window.localStorage.getItem("auth");
  if (!auth) auth = window.sessionStorage.getItem("auth");
  if (auth) {
    return {
      Authorization: `Bearer ${JSON.parse(auth).token}`,
    };
  } else {
    return {};
  }
};

export const axios = Axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    ...authHeader(),
  },
});

export default axios;
