import { ITask, TModeTimer, TStateTimer } from "../../pages/PomodoroTimer";
import { Button } from "../Button";

interface IProps {
  myStart: () => void;
  myPause: () => void;
  myRestart: (modeTimer: TModeTimer) => void;
  myResume: () => void;
  setCountPomodor: (value: number) => void;
  setTaskList: (value: ITask[]) => void;
  taskList: ITask[];
  countPomodor: number;
  modeTimer: TModeTimer;
  stateTimer: TStateTimer;
}

export const TimerButtons = ({
  myStart,
  myPause,
  myRestart,
  myResume,
  setCountPomodor,
  setTaskList,
  taskList,
  countPomodor,
  modeTimer,
  stateTimer,
}: IProps) => {
  return (
    <>
      {stateTimer === "notStarted" ? (
        <>
          <Button type="green" onClick={myStart}>
            Старт
          </Button>
          <Button
            onClick={() => {
              myRestart(modeTimer);
            }}
            type="disabled"
          >
            Стоп
          </Button>
        </>
      ) : stateTimer === "launched" ? (
        modeTimer === "pomodoro" ? (
          <>
            <Button type="green" onClick={myPause}>
              Пауза
            </Button>
            <Button
              type="red"
              onClick={() => {
                myRestart(modeTimer);
              }}
            >
              Стоп
            </Button>
          </>
        ) : (
          <>
            <Button type="green" onClick={myPause}>
              Пауза
            </Button>
            <Button
              type="red"
              onClick={() => {
                myRestart("pomodoro");
                setCountPomodor(++countPomodor);
              }}
            >
              Пропустить
            </Button>
          </>
        )
      ) : stateTimer === "stopped" && modeTimer === "pomodoro" ? (
        <>
          <Button type="green" onClick={myResume}>
            Продолжить
          </Button>
          <Button
            type="red"
            onClick={() => {
              myRestart(modeTimer);
              setTaskList(taskList.filter((task, index) => index !== 0));
            }}
          >
            Сделано
          </Button>
        </>
      ) : (
        <>
          <Button type="green" onClick={myResume}>
            Продолжить
          </Button>
          <Button
            type="red"
            onClick={() => {
              myRestart("pomodoro");
              setCountPomodor(++countPomodor);
            }}
          >
            Пропустить
          </Button>
        </>
      )}
    </>
  );
};
