import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  useEffect(() => {
    document.title = "StratHub";
  }, []);

  // force set to light mode untill we get toggle
  const [darkMode, setDarkMode] = useDarkMode();
  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
