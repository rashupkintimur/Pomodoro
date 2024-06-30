import { getDayOfWeak } from "../../utils/getDayOfWeak";
import { getTimeFromMins, getTimeFromSecs } from "../../utils/getTimeFrom";
import "./timeOfWork.css";

interface IProps {
  workTimer: number;
}

export const TimeOfwork = ({ workTimer }: IProps) => {
  return (
    <>
      <h3 className="title statistics-aside__top-title">
        {getDayOfWeak(new Date().getDay())}
      </h3>
      <p className="statistics-aside__top-descr">
        {!workTimer ? (
          "Нет данных"
        ) : (
          <>
            Вы работали над задачами в течение{" "}
            <span>
              {workTimer >= 60
                ? getTimeFromMins(workTimer)
                : getTimeFromSecs(workTimer)}
            </span>
          </>
        )}
      </p>
    </>
  );
};
