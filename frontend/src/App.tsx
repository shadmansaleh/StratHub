import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import useDarkMode from "./hooks/useDarkMode";
import NavBar from "./components/NavBar";

function App() {
  useEffect(() => {
    document.title = "StratHub";
  }, []);

  // force set to light mode until we get toggle
  const [darkMode, setDarkMode] = useDarkMode();
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
