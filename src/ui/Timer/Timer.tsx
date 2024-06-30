import { useEffect } from "react";
import { ITask, TModeTimer, TStateTimer } from "../../pages/PomodoroTimer";
import "./timer.css";
import { TimerButtons } from "../TimerButtons";
import sound from "../../assets/sounds/budilnik.mp3";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  setStateTimer: (value: TStateTimer) => void;
  setCountPomodor: (value: number) => void;
  setCountPause: (value: number) => void;
  setPauseTime: (value: number) => void;
  setWorkTimer: (value: number) => void;
  setModeTimer: (value: TModeTimer) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  restartTimer: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
  startStopwatchPause: () => void;
  pauseStopwatchPause: () => void;
  startStopwatchWork: () => void;
  pauseStopwatchWork: () => void;
  setTaskList: (value: ITask[]) => void;
  taskList: ITask[];
  durationShortBreak: number;
  durationLongBreak: number;
  durationPomodor: number;
  countPomodor: number;
  countPause: number;
  modeTimer: TModeTimer;
  stateTimer: TStateTimer;
  taskName: string;
  secondsTimer: number;
  minutesTimer: number;
  totalSecondsStopWatchPause: number;
  totalSecondsStopWatchWork: number;
}

export const Timer = ({
  setStateTimer,
  setCountPomodor,
  setCountPause,
  setPauseTime,
  setWorkTimer,
  setModeTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
  restartTimer,
  startStopwatchPause,
  pauseStopwatchPause,
  startStopwatchWork,
  pauseStopwatchWork,
  setTaskList,
  taskList,
  durationShortBreak,
  durationLongBreak,
  durationPomodor,
  countPomodor,
  countPause,
  modeTimer,
  stateTimer,
  taskName,
  secondsTimer,
  minutesTimer,
  totalSecondsStopWatchPause,
  totalSecondsStopWatchWork,
}: IProps) => {
  useEffect(() => {
    setWorkTimer(totalSecondsStopWatchWork);
    setPauseTime(totalSecondsStopWatchPause);
  }, []);

  const myStart = () => {
    startTimer();
    setStateTimer("launched");
    modeTimer === "nothing" ? setModeTimer("pomodoro") : "";
    startStopwatchWork();
  };

  const myPause = () => {
    pauseTimer();
    setCountPause(countPause + 1);
    setStateTimer("stopped");
    startStopwatchPause();
  };

  const myResume = () => {
    resumeTimer();
    setStateTimer("launched");
    pauseStopwatchPause();
    startStopwatchWork();
  };

  const myRestart = (modeTimer: TModeTimer) => {
    const time = new Date();

    switch (modeTimer) {
      case "pomodoro":
        time.setSeconds(time.getSeconds() + durationPomodor * 60);
        break;
      case "short break":
        time.setSeconds(time.getSeconds() + durationShortBreak * 60);
        break;
      case "long break":
        time.setSeconds(time.getSeconds() + durationLongBreak * 60);
        break;
    }

    restartTimer(time, false);
    setStateTimer("notStarted");
    setModeTimer(modeTimer);
    pauseStopwatchPause();
    setPauseTime(totalSecondsStopWatchPause);
    pauseStopwatchWork();
    setWorkTimer(totalSecondsStopWatchWork);
  };

  useEffect(() => {
    if (secondsTimer === 0 && minutesTimer === 0) {
      if (modeTimer === "pomodoro") {
        if (countPomodor % 4 === 0) {
          myRestart("long break");
        } else {
          myRestart("short break");
        }

        toast.success("Помидорка кончилась...");
      } else {
        setCountPomodor(++countPomodor);
        myRestart("pomodoro");

        toast.success("Пора работать!");
      }

      pauseStopwatchWork();
      new Audio(sound).play();
    }
  }, [secondsTimer, minutesTimer]);

  return (
    <div className="timer">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div
        className={`timer__header ${
          stateTimer === "notStarted"
            ? ""
            : modeTimer === "pomodoro"
            ? "pomodoro-active"
            : modeTimer === "short break" || modeTimer === "long break"
            ? "break"
            : ""
        }`}
      >
        <h4 className="timer__name-task">{taskName}</h4>
        <h6 className="timer__count-pomodor">Помидор {countPomodor}</h6>
      </div>
      <div className="timer__content">
        <div className="timer__inner">
          <h2
            className={`timer__time ${
              stateTimer === "launched" && modeTimer === "pomodoro"
                ? "active-pomodoro"
                : stateTimer === "launched" &&
                  (modeTimer === "long break" || modeTimer === "short break")
                ? "active-break"
                : ""
            }`}
          >
            {minutesTimer}:{secondsTimer}
          </h2>
          <p className="timer__info">
            Задача 1 - <span>{taskName}</span>
          </p>
          <div className="timer__btns">
            <TimerButtons
              myStart={myStart}
              myPause={myPause}
              myRestart={myRestart}
              myResume={myResume}
              setCountPomodor={setCountPomodor}
              setTaskList={setTaskList}
              taskList={taskList}
              countPomodor={countPomodor}
              modeTimer={modeTimer}
              stateTimer={stateTimer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
