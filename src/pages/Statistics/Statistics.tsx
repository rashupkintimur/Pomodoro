import { useContext, useState } from "react";
import "./statistics.css";
import { StatisticsContext } from "../../contexts/statisticsConext";
import { getTimeFromMins, getTimeFromSecs } from "../../utils/getTimeFrom";
import { Schedule } from "../../ui/Schedule";
import { TimeOfwork } from "../../ui/TimeOfWork";
import { CountPomodor } from "../../ui/CountPomodor";

const data = [
  {
    name: "Пн",
    uv: 0,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Вт",
    uv: 0,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Ср",
    uv: 0,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Чт",
    uv: 0,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Пт",
    uv: 0,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Сб",
    uv: 0,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Вс",
    uv: 0,
    pv: 4300,
    amt: 2100,
  },
];

export const Statistics = () => {
  const statisticsInfo = useContext(StatisticsContext);
  const dayOfWeekNumber =
    new Date().getDay() + 1 === 7 ? 0 : new Date().getDay();
  const [activeIndex, setActiveIndex] = useState(dayOfWeekNumber);

  if (!statisticsInfo) {
    return;
  }

  const workTimer = Number(statisticsInfo.workTimer);
  const pauseTime = Number(statisticsInfo.pauseTime);
  const countPause = Number(statisticsInfo.countPause);
  const countPomodor = Number(statisticsInfo.countPomodor);

  workTimer >= 60
    ? (data[dayOfWeekNumber].uv = workTimer / 60)
    : (data[dayOfWeekNumber].uv = workTimer);

  const focus = workTimer
    ? Math.round(((workTimer - pauseTime) / workTimer) * 100)
    : 0;

  const handleActiveIndex = ({ index }: { index: number }) => {
    setActiveIndex(index);
  };

  return (
    <div className="statistics">
      <div className="container">
        <div className="statistics__header">
          <h1 className="title">Ваша активность</h1>
        </div>
        <div className="statistics__main">
          <div className="statistics-aside">
            <div className="statistics-aside__top">
              <TimeOfwork workTimer={workTimer - pauseTime} />
            </div>
            <div
              className={`statistics-aside__bottom ${
                !(countPomodor - 1) ? "no-data" : ""
              }`}
            >
              <CountPomodor countPomodor={countPomodor} />
            </div>
          </div>
          <div className="statistics__schedule">
            <Schedule
              data={data}
              activeIndex={activeIndex}
              handleActiveIndex={handleActiveIndex}
            />
          </div>
        </div>
        <div className="statistics__footer">
          <div className={`statistics-card ${!focus ? "no-data" : ""}`}>
            <div className="statistics-card__info">
              <h4 className="statistics-card__title title">Фокус</h4>
              <p className="statistics-card__info">{focus}%</p>
            </div>
            <svg
              width="129"
              height="129"
              viewBox="0 0 129 129"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className={`statistics-card ${!countPause ? "no-data" : ""}`}>
            <div className="statistics-card__info">
              <h4 className="statistics-card__title title">Время на паузе</h4>
              <p className="statistics-card__info">
                {pauseTime >= 60
                  ? getTimeFromMins(pauseTime)
                  : getTimeFromSecs(pauseTime)}
              </p>
            </div>
            <svg
              width="129"
              height="129"
              viewBox="0 0 129 129"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M64.3154 37.1579V64.3158L77.8944 77.8947"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className={`statistics-card ${!countPause ? "no-data" : ""}`}>
            <div className="statistics-card__info">
              <h4 className="statistics-card__title title">Остановки</h4>
              <p className="statistics-card__info">{countPause}</p>
            </div>
            <svg
              width="129"
              height="129"
              viewBox="0 0 129 129"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28 27L102 101"
                stroke="#C4C4C4"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
