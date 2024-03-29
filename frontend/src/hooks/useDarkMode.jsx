import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme");
  const isEnabled = typeof enabledState === "undefined" && enabled;

  useEffect(() => {
    const className = "dark";
    const lightTheme = "light";
    const darkTheme = "dark";
    const bodyClass = window.document.body.classList;
    const html = document.querySelector("html");
    if (isEnabled) {
      bodyClass.add(className); // switch for tailwind
      html.setAttribute("data-theme", darkTheme); // switch daisyUI theme
    } else {
      bodyClass.remove(className);
      html.setAttribute("data-theme", lightTheme);
    }
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
