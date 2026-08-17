import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("cbt-theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "cbt-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDarkMode((previous) => !previous)}
      aria-label="Toggle light and dark mode"
      title="Toggle light/dark mode"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;