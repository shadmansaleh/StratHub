import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import UserHomePage from "./pages/UserHome";
import useDarkMode from "./hooks/useDarkMode";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login_Signup/Login";
import SignUpPage from "./pages/Login_Signup/SignUp";
import { SnackbarProvider } from "notistack";
import { Role, ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    document.title = "StratHub";
  }, []);

  // force set to light mode until we get toggle
  const [_, setDarkMode] = useDarkMode();
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <>
      <div className="bg-blue-100">
        <SnackbarProvider autoHideDuration={2000}>
          <NavBar />
          <div className="w-[80%] m-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute role={Role.NOAUTH}>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute role={Role.AUTH}>
                    <UserHomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute role={Role.NOAUTH}>
                    <LoginPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute role={Role.NOAUTH}>
                    <SignUpPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </SnackbarProvider>
      </div>
    </>
  );
}

export default App;
