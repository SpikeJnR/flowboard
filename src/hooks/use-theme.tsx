import {Theme} from "../utils/const.ts";
import {useState} from "react";
import {getUserTheme, setUserTheme} from "../services/taskService.ts";
import {auth} from "../firebase.ts";

const useTheme = () => {
  const [theme, setThemeState] = useState<string>(() => {
    const savedTheme = document.documentElement.getAttribute('data-theme');
    return savedTheme || Theme.LIGHT;
  });

  const applyTheme = (newTheme: string, isUserAuthenticated: boolean) => {
    const finalTheme = isUserAuthenticated ? newTheme : Theme.LIGHT;

    document.documentElement.setAttribute('data-theme', finalTheme);
    setThemeState(finalTheme);

    if(isUserAuthenticated) {
      localStorage.setItem('theme', finalTheme);
      setUserTheme(finalTheme).catch(console.error);
    }
  };

  const initTheme = async () => {
    const isAuthenticated = !!auth.currentUser;

    try {
      const serverTheme = isAuthenticated ? await getUserTheme() : null;
      const localTheme = isAuthenticated ? localStorage.getItem('theme') : null;
      const newTheme = serverTheme || localTheme || Theme.LIGHT;
      applyTheme(newTheme, isAuthenticated);
    } catch (error) {
      applyTheme(Theme.LIGHT, isAuthenticated);
    }
  };

  const toggleTheme = async () => {
    const isAuthenticated = !!auth.currentUser;
    if(!isAuthenticated) return;

    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    applyTheme(newTheme, isAuthenticated);
  };

  return { theme, toggleTheme, initTheme };
};

export default useTheme;
