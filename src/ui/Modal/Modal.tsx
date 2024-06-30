import { ITask } from "../../pages/PomodoroTimer";
import { Button } from "../Button";
import "./modal.css";

interface IProps {
  setTaskList: (value: ITask[]) => void;
  setIsOpenModal: (value: boolean) => void;
  taskList: ITask[];
  id: number;
}

export const Modal = ({
  setTaskList,
  setIsOpenModal,
  taskList,
  id,
}: IProps) => {
  const handleDeleteTask = () => {
    const newTaskList = taskList.filter((_task, index) => index !== id);

    setTaskList([...newTaskList]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="modal">
      <div className="modal__inner">
        <h2 className="modal__title">Удалить задачу?</h2>
        <div className="modal__btns">
          <Button
            className="modal__del-btn"
            type="red"
            onClick={handleDeleteTask}
          >
            Удалить
          </Button>
          <button onClick={handleCloseModal} className="modal__cancel-btn">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
