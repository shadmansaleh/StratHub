import { useState, useEffect, useContext } from "react";
import { useAxios } from "../../hooks/useAxios";
import { AxiosResponse } from "axios";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";
import NavBarFloating from "../../components/NavBarfloating";
import { BsChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

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

  const { auth } = useContext(AuthContext);

  return (
    <>
      <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col w-full bg-base-100">
          <NavBarFloating />
          <div className="mx-auto my-6 w-[98%] h-full overflow-y-auto overflow-x-hidden">
            {(auth?.role === "user" || auth?.role === "expert") && (
              <Link to={`/${auth.role}/chat`}>
                <BsChatDotsFill className="fixed bottom-8 right-8 text-4xl text-accent cursor-pointer shadow-xl z-10" />
              </Link>
            )}
            <Outlet />
          </div>
        </div>
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
