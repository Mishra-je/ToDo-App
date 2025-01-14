import TodoList from "./components/TodoList";
import { useState, useEffect } from "react";
import { RiTodoFill } from "react-icons/ri";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
     <div>
     <h1   className={`fixed z-10 left-3 top-3 sm:left-6 sm:top-6 text-lg md:text-2xl  font-bold text-yellow-700  p-1 rounded-md flex items-center gap-1 `} >Todo<RiTodoFill /></h1>
     <button
        type="button"
        onClick={handleThemeSwitch}
        className={`fixed z-10 right-3 top-3 sm:right-6 sm:top-6 text-lg p-1 rounded-md ${theme=='dark' ?'bg-custom-blue' : 'bg-slate-800' }`}
      >
        {theme === "dark" ? "🌙" : "🌞"}
      </button>
     </div>
   
      <TodoList />
    </>
  );
}

export default App;
