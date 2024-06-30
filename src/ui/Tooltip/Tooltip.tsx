import Tippy from "@tippyjs/react";
import optionsTaskIcon from "../../assets/img/options-task.svg";
import deleteTaskIcon from "../../assets/img/delete.svg";
import controlIncrementIcon from "../../assets/img/control-increment.svg";
import controlDecrementIcon from "../../assets/img/control-decrement.svg";
import { MouseEvent, useContext } from "react";
import { Modal } from "../Modal";
import { TaskTrackerContext } from "../../contexts/taskTracker";
import "./tooltip.css";

interface IProps {
  index: number;
}

export const Tooltip = ({ index }: IProps) => {
  const taskTrackerInfo = useContext(TaskTrackerContext);

  if (!taskTrackerInfo) {
    return;
  }

  const setTaskList = taskTrackerInfo.setTaskList;
  const setIsOpenModal = taskTrackerInfo.setIsOpenModal;
  const taskList = taskTrackerInfo.taskList;
  const isOpenModal = taskTrackerInfo.isOpenModal;

  const handleIncreasePomodors = (event: MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.dataset.taskid);

    const newTaskList = taskList.map((task, index) => {
      if (index === id) {
        task.countPomodor++;
      }

      return task;
    });

    setTaskList([...newTaskList]);
  };

  const handleDecreasePomodors = (event: MouseEvent<HTMLButtonElement>) => {
    const id = Number(event.currentTarget.dataset.taskid);

    const newTaskList = taskList.map((task, index) => {
      if (index === id) {
        if (task.countPomodor <= 1) return task;

        task.countPomodor--;
      }

      return task;
    });

    setTaskList([...newTaskList]);
  };

  const handleDeleteTask = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {isOpenModal ? (
        <Modal
          setTaskList={setTaskList}
          setIsOpenModal={setIsOpenModal}
          taskList={taskList}
          id={index}
        />
      ) : (
        ""
      )}
      <Tippy
        content={
          <ul className="task-list__tooltip">
            <li>
              <button onClick={handleIncreasePomodors} data-taskid={index}>
                <img src={controlIncrementIcon} alt="" />
                <span>Увеличить</span>
              </button>
            </li>
            <li>
              <button onClick={handleDecreasePomodors} data-taskid={index}>
                <img src={controlDecrementIcon} alt="" />
                <span>Уменьшить</span>
              </button>
            </li>
            <li>
              <button onClick={handleDeleteTask} data-taskid={index}>
                <img src={deleteTaskIcon} alt="" />
                <span>Удалить</span>
              </button>
            </li>
          </ul>
        }
        interactive={true}
      >
        <button className="task-list__options-btn">
          <img src={optionsTaskIcon} alt="" />
        </button>
      </Tippy>
    </>
  );
};
