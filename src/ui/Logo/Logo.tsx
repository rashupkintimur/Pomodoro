import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import "./logo.css";

export const Logo = () => {
  return (
    <div className="logo">
      <Link className="logo-link" to={"/"}>
        <img src={logo} alt="" />
        <p>pomodoro_box</p>
      </Link>
    </div>
  );
};
