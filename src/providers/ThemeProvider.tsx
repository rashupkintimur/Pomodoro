import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { useLocalStorageWithState } from "../hooks/useLocalStorage";
import { TTheme, ThemeContext } from "../contexts/themeContext";

interface IProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useLocalStorageWithState("theme", "light");

  useEffect(() => {
    if (theme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme: setTheme as Dispatch<SetStateAction<string>>,
        theme: theme as TTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
