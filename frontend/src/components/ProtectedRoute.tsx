import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from "react-router-dom";
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
  children: React.ReactNode;
  role?: Role;
}) {
  if (!role) role = Role.AUTH;
  const { auth } = useContext(AuthContext);
  if (role === Role.NOAUTH) {
    if (auth?.token) return <Navigate to="/home" />;
    return children;
  }
  if (!auth?.token) {
    enqueueSnackbar("Please login to access this page", { variant: "error" });
    return <Navigate to="/login" />;
  }
  if (role === Role.AUTH) return children;
  if (auth?.role === role) return children;
  enqueueSnackbar("You do not have permission to access this page", {
    variant: "error",
  });
  return <Navigate to="/home" />;
}

export default ProtectedRoute;
