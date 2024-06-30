import { ChangeEvent, useContext, useRef, useState } from "react";
import { ITask } from "../../pages/PomodoroTimer";
import { Tooltip } from "../Tooltip";
import "./task.css";
import { TaskTrackerContext } from "../../contexts/taskTracker";

interface IProps {
  task: ITask;
  index: number;
}

export const Task = ({ task, index }: IProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(task.text);

  const taskTrackerInfo = useContext(TaskTrackerContext);

  if (!taskTrackerInfo) {
    return;
  }

  const setTaskList = taskTrackerInfo.setTaskList;
  const taskList = taskTrackerInfo.taskList;

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) return;

    setInputValue(event.target.value);
  };

  const handleBlurInput = (event: ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.currentTarget.dataset.taskid);

    const newTaskList = taskList.map((task, index) => {
      if (index === id) {
        if (ref !== null) {
          task.text = ref?.current?.value ?? "";
        }
      }

      return task;
    });

    setTaskList([...newTaskList]);
  };

  return (
    <>
      <p className="task-list__name">
        <span className="task-list__count">{task.countPomodor}</span>
        <input
          onBlur={handleBlurInput}
          onChange={handleChangeInput}
          ref={ref}
          data-taskid={index}
          className="task-list__input"
          type="text"
          value={inputValue}
        />
      </p>
      <Tooltip index={index} />
    </>
  );
};
