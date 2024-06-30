import "./taskList.css";
import { TotalTime } from "../TotalTime";
import { Task } from "../Task";
import { useContext } from "react";
import { TaskTrackerContext } from "../../contexts/taskTracker";

interface IProps {
  durationPomodor: number;
}

export const TaskList = ({ durationPomodor }: IProps) => {
  const taskTrackerInfo = useContext(TaskTrackerContext);

  if (!taskTrackerInfo) {
    return;
  }

  const taskList = taskTrackerInfo.taskList;

  return (
    <>
      {taskList.length ? (
        <>
          <ul className="task-list">
            {taskList.map((task, index) => (
              <li className="task-list__task" key={`${task.text}${index}`}>
                <Task task={task} index={index} />
              </li>
            ))}
          </ul>
          <TotalTime
            totalPomodors={taskList.reduce(
              (prevCount, task) => prevCount + task.countPomodor,
              0
            )}
            durationPomodor={durationPomodor}
          />
        </>
      ) : null}
    </>
  );
};
