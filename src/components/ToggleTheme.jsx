import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";


const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full transition-all duration-300 ease-in-out"
    >
      <span className="relative block w-5 h-5">
        <MoonIcon
          className={`absolute top-0 left-0 w-5 h-5 text-yellow-900 transition-all duration-300 ease-in-out 
        ${darkMode ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
        />
        <SunIcon
          className={`absolute top-0 left-0 w-5 h-5 text-white transition-all duration-300 ease-in-out 
        ${darkMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'}`}
        />
      </span>
    </button>
  );
};

export default ToggleTheme;