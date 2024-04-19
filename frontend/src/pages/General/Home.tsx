import { useState, useEffect } from "react";
import { useAxios } from "../../hooks/useAxios";
import { AxiosResponse } from "axios";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

interface User {
  username?: string;
  email?: string;
  role?: string;
}

function UserHome() {
  const { axios, axiosErrHandler } = useAxios();
  useEffect(() => {
    axios.get("/auth/verify_token").catch(axiosErrHandler);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export const UserInfo = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(true);
  const { axios, axiosErrHandler } = useAxios();
  useEffect(() => {
    axios
      .get("/user/get_user")
      .then((res: AxiosResponse) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(axiosErrHandler);
  }, []);

  return (
    <div className="hero min-h-screen">
      <div className="hero-body">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <h1 className="text-4xl font-bold py-20 mx-auto">
              Welcome {user?.role}
            </h1>
            <h1 className="text-2xl font-normal py-2 mx-auto">
              Home page of {user?.username}
            </h1>
            <h1 className="text-2xl font-normal mx-auto">
              Email: {user?.email}
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default UserHome;
