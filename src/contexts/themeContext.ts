import { createContext } from "react";

export type TTheme = "dark" | "light";

export interface IThemeContext {
  setTheme: (value: TTheme) => void;
  theme: TTheme;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
