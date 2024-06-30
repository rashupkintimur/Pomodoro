import { useContext } from "react";
import { Logo } from "../Logo";
import { Stats } from "../Stats";
import "./header.css";
import { ThemeContext } from "../../contexts/themeContext";

export const Header = () => {
  const themeData = useContext(ThemeContext);

  if (!themeData) return;

  const theme = themeData.theme;
  const setTheme = themeData.setTheme;

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Logo />
        <div className="header__btns">
          <button className="header__theme" onClick={changeTheme}>
            Сменить тему
          </button>
          <Stats />
        </div>
      </div>
    </header>
  );
};
