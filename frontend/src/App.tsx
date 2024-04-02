import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import useDarkMode from "./hooks/useDarkMode";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login_Signup/Login";
import SignUpPage from "./pages/Login_Signup/SignUp";
import { SnackbarProvider } from "notistack";

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
          <NavBar userToken={null} />
          <div className="w-[80%] m-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </div>
          <Footer />
        </SnackbarProvider>
      </div>
    </>
  );
}

export default App;
