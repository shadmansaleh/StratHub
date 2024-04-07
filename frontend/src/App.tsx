import { useEffect, useContext } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
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
        { path: "settings", element: <UserInfo /> },
        { path: "home", element: <UserInfo /> },
        { path: "profile", element: <UserInfo /> },
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
