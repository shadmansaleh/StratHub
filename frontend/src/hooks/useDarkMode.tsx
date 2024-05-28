import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme");
  const isEnabled = typeof enabled != "undefined" && enabled;

  useEffect(() => {
    const className = "dark";
    const lightTheme = "strathub-light";
    const darkTheme = "strathub-dark";
    const bodyClass = window.document.body.classList;
    const html = document.querySelector<HTMLHtmlElement>("html");
    if (isEnabled) {
      bodyClass.add(className); // switch for tailwind
      html?.setAttribute("data-theme", darkTheme); // switch daisyUI theme
    } else {
      bodyClass.remove(className);
      html?.setAttribute("data-theme", lightTheme);
    }
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
