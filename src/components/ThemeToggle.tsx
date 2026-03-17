import { useTheme } from "../contexts/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={`Alternar para tema ${theme === "light" ? "escuro" : "claro"}`}
      title={`Tema atual: ${theme === "light" ? "Claro" : "Escuro"}`}
    >
      {theme === "light" ? (
        <SunIcon className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-blue-300" />
      )}
    </button>
  );
}