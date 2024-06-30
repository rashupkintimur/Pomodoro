import { ChangeEvent, memo, useContext, useState } from "react";
import { Timer } from "../../ui/Timer";
import { StatisticsContext } from "../../contexts/statisticsConext";
import { useStopwatch, useTimer } from "react-timer-hook";
import { Rules } from "../../ui/Rules";
import { TaskTracker } from "../../ui/TaskTrackrer";
import { TaskTrackerContext } from "../../contexts/taskTracker";
import "./pomodoroTimer.css";

interface IProps {
  durationPomodor: number;
  durationShortBreak: number;
  durationLongBreak: number;
}

export interface ITask {
  text: string;
  countPomodor: number;
}

export type TStateTimer = "notStarted" | "launched" | "stopped";
export type TModeTimer =
  | "pomodoro"
  | "short break"
  | "long break"
  | "nothing"
  | "launched";

const RulesMemo = memo(Rules);

export const PomodoroTimer = ({
  durationPomodor,
  durationShortBreak,
  durationLongBreak,
}: IProps) => {
  const statisticsInfo = useContext(StatisticsContext);
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [stateTimer, setStateTimer] = useState<TStateTimer>("notStarted");
  const [modeTimer, setModeTimer] = useState<TModeTimer>("nothing");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + durationPomodor * 60);

  // extract data from context

  const countPomodor = statisticsInfo?.countPomodor ?? 1;
  const countPause = statisticsInfo?.countPause ?? 0;
  const workTimer = statisticsInfo?.workTimer;
  const pauseTime = statisticsInfo?.pauseTime;

  // timers and stopwatches

  const {
    seconds: secondsTimer,
    minutes: minutesTimer,
    start: startTimer,
    pause: pauseTimer,
    resume: resumeTimer,
    restart: restartTimer,
  } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
  });

  const offsetTimestampWorkTimer = new Date();
  offsetTimestampWorkTimer.setSeconds(
    offsetTimestampWorkTimer.getSeconds() + Number(workTimer)
  );
  const offsetTimestampPauseTime = new Date();
  offsetTimestampPauseTime.setSeconds(
    offsetTimestampPauseTime.getSeconds() + Number(pauseTime)
  );

  const {
    totalSeconds: totalSecondsStopWatchPause,
    start: startStopwatchPause,
    pause: pauseStopwatchPause,
  } = useStopwatch({
    autoStart: false,
    offsetTimestamp: offsetTimestampPauseTime,
  });

  const {
    totalSeconds: totalSecondsStopWatchWork,
    start: startStopwatchWork,
    pause: pauseStopwatchWork,
  } = useStopwatch({
    autoStart: false,
    offsetTimestamp: offsetTimestampWorkTimer,
  });

  if (!statisticsInfo) {
    return;
  }

  const setCountPomodor = statisticsInfo.setCountPomodor;
  const setCountPause = statisticsInfo.setCountPause;
  const setPauseTime = statisticsInfo.setPauseTime;
  const setWorkTimer = statisticsInfo.setWorkTimer;

  // handles

  const handleInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (!inputValue.length) return;

    setTaskList((prevTaskList) => [
      ...prevTaskList,
      { text: inputValue, countPomodor: 1 },
    ]);
    setInputValue("");
  };

  return (
    <div className="pomodoro">
      <div className="container pomodoro__container">
        <div className="pomodoro__info">
          <h1 className="title pomodoro__title">
            Ура! Теперь можно начать работать:
          </h1>
          <div className="pomodoro__info-content">
            <RulesMemo />
            <TaskTrackerContext.Provider
              value={{ setIsOpenModal, setTaskList, isOpenModal, taskList }}
            >
              <TaskTracker
                handleInputValue={handleInputValue}
                handleAddTask={handleAddTask}
                inputValue={inputValue}
                durationPomodor={durationPomodor}
              />
            </TaskTrackerContext.Provider>
          </div>
        </div>
        <Timer
          setModeTimer={setModeTimer}
          setStateTimer={setStateTimer}
          setCountPomodor={setCountPomodor}
          setPauseTime={setPauseTime}
          setWorkTimer={setWorkTimer}
          setCountPause={setCountPause}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          resumeTimer={resumeTimer}
          restartTimer={restartTimer}
          startStopwatchPause={startStopwatchPause}
          pauseStopwatchPause={pauseStopwatchPause}
          startStopwatchWork={startStopwatchWork}
          pauseStopwatchWork={pauseStopwatchWork}
          taskList={taskList}
          setTaskList={setTaskList}
          durationLongBreak={durationLongBreak}
          durationShortBreak={durationShortBreak}
          durationPomodor={durationPomodor}
          countPomodor={countPomodor}
          countPause={countPause}
          stateTimer={stateTimer}
          modeTimer={modeTimer}
          taskName={taskList.length ? taskList[0].text : "Задачи нет"}
          secondsTimer={secondsTimer}
          minutesTimer={minutesTimer}
          totalSecondsStopWatchPause={totalSecondsStopWatchPause}
          totalSecondsStopWatchWork={totalSecondsStopWatchWork}
        />
      </div>
    </div>
  );
};
