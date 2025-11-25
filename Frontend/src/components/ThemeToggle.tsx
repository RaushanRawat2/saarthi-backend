import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark";

export const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    // Initialize from localStorage or system preference
    const stored = localStorage.getItem("theme");
    let initial: ThemeMode = "light";
    if (stored === "light" || stored === "dark") {
      initial = stored;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initial = "dark";
    }
    applyTheme(initial);
    setMode(initial);
  }, []);

  const applyTheme = (next: ThemeMode) => {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", next);
  };

  const toggle = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    applyTheme(next);
    setMode(next);
  };

  return (
    <button
      onClick={toggle}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        ${mode === "dark" 
          ? "bg-primary" 
          : "bg-muted"
        }
      `}
      role="switch"
      aria-checked={mode === "dark"}
      aria-label="Toggle dark mode"
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-background shadow-lg transition-transform
          ${mode === "dark" ? "translate-x-6" : "translate-x-1"}
        `}
      >
        <div className="flex items-center justify-center h-full">
          {mode === "dark" ? (
            <Moon className="w-3 h-3 text-primary" />
          ) : (
            <Sun className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
      </span>
    </button>
  );
};

export default ThemeToggle;


