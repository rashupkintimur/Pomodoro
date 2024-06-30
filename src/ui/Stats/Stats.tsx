import { Link } from "react-router-dom";
import statistics from "../../assets/img/statistics.svg";
import "./stats.css";

export const Stats = () => {
  return (
    <div className="stats">
      <Link to={"/statistics"} className="stats-link">
        <img src={statistics} alt="" />
        <p>Статистика</p>
      </Link>
    </div>
  );
};
