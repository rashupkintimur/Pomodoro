import PomodoroSvg from "../../assets/img/logo.svg";
import PomodoroSvg2 from "../../assets/img/tomato-2.svg";
import "./countPomodor.css";

interface IProps {
  countPomodor: number;
}

export const CountPomodor = ({ countPomodor }: IProps) => {
  return (
    <>
      {!(countPomodor - 1) ? (
        <img src={PomodoroSvg2} alt="" />
      ) : (
        <>
          <div className="statistics-aside__bottom-top">
            <img width={81} height={81} src={PomodoroSvg} alt="" />
            <span className="title">x {countPomodor - 1}</span>
          </div>
          <div className="statistics-aside__bottom-info">
            <h4 className="title statistics-aside__bottom-info-title">
              {countPomodor - 1} помидора
            </h4>
          </div>
        </>
      )}
    </>
  );
};
