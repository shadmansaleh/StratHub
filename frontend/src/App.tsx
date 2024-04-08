import { useEffect, useContext } from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/Home";
import UserHomePage from "./pages/UserHome";
import useDarkMode from "./hooks/useDarkMode";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login_Signup/Login";
import SignUpPage from "./pages/Login_Signup/SignUp";
import ResetPasswordPage from "./pages/Login_Signup/ResetPassword";
import { SnackbarProvider } from "notistack";
import { Role, ProtectedRoute } from "./components/ProtectedRoute";
import NotFound404 from "./pages/NotFound404";
import { AuthContext } from "./contexts/AuthProvider";
import { UserInfo } from "./pages/UserHome/UserHome";

function App() {
  // force set to light mode until we get toggle
  const [_, setDarkMode] = useDarkMode();
  const { auth } = useContext(AuthContext);
  const user_logged_in = auth?.token ? true : false;

  useEffect(() => {
    setDarkMode(false);
  }, []);

  const AppRoutes = useRoutes([
    {
      path: "/",
      element: <ProtectedRoute role={Role.NOAUTH} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignUpPage /> },
        { path: "forgot_password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute role={Role.USER}>
          <UserHomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <UserInfo /> },
        { path: "dashboard", element: <UserInfo /> },
        { path: "profile", element: <UserInfo /> },
        { path: "search", element: <UserInfo /> },
        { path: "appointments", element: <UserInfo /> },
        { path: "favorites", element: <UserInfo /> },
        { path: "history", element: <UserInfo /> },
        { path: "settings", element: <UserInfo /> },
        { path: "consultant/:id", element: <UserInfo /> },
        { path: "meet/:id", element: <UserInfo /> },
      ],
    },
    {
      path: "/expert",
      element: (
        <ProtectedRoute role={Role.EXPERT}>
          <UserHomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <UserInfo /> },
        { path: "dashboard", element: <UserInfo /> },
        { path: "profile", element: <UserInfo /> },
        { path: "clients", element: <UserInfo /> },
        { path: "recent", element: <UserInfo /> },
        { path: "settings", element: <UserInfo /> },
        { path: "meet/:id", element: <UserInfo /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role={Role.ADMIN}>
          <UserHomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <UserInfo /> },
        { path: "dashboard", element: <UserInfo /> },
        { path: "users", element: <UserInfo /> },
        { path: "experts", element: <UserInfo /> },
        { path: "verify", element: <UserInfo /> },
        { path: "reports", element: <UserInfo /> },
        { path: "settings", element: <UserInfo /> },
      ],
    },
    { path: "*", element: <NotFound404 /> },
  ]);

  return (
    <>
      <div className="bg-blue-100">
        <SnackbarProvider autoHideDuration={2000}>
          {!user_logged_in && <NavBar />}
          {AppRoutes}
          {!user_logged_in && <Footer />}
        </SnackbarProvider>
      </div>
    </>
  );
}

export default App;
