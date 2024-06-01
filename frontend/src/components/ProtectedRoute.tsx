import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export enum Role {
  NOAUTH = "no_auth",
  AUTH = "auth",
  USER = "user",
  EXPERT = "expert",
  ADMIN = "admin",
}

export function ProtectedRoute({
  children,
  role,
}: {
  role?: Role;
  children?: React.ReactNode;
}) {
  if (!role) role = Role.AUTH;
  const retAccept = children ? children : <Outlet />;
  const { auth } = useContext(AuthContext);
  if (role === Role.NOAUTH) {
    if (auth?.token) return <Navigate to={`${__BASE_URL__}/${auth.role}`} />;
    return retAccept;
  }
  if (!auth?.token) {
    enqueueSnackbar("Please login to access this page", { variant: "error" });
    return <Navigate to={`${__BASE_URL__}/login`} />;
  }
  if (role === Role.AUTH) return retAccept;
  if (auth?.role === role) return retAccept;
  enqueueSnackbar("You do not have permission to access this page", {
    variant: "error",
  });
  return <Navigate to={`${__BASE_URL__}/${auth.role}`} />;
}

export default ProtectedRoute;
