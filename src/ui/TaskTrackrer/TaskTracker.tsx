import { ChangeEvent } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { TaskList } from "../TaskList";
import "./taskTracker.css";

interface IProps {
  handleInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: () => void;
  inputValue: string;
  durationPomodor: number;
}

export const TaskTracker = ({
  handleInputValue,
  handleAddTask,
  inputValue,
  durationPomodor,
}: IProps) => {
  return (
    <div className="task-tracker">
      <Input
        onChange={handleInputValue}
        value={inputValue}
        placeholder="Название задачи"
        className="task-tracker__input"
      />
      <Button
        onClick={handleAddTask}
        type="green"
        className="task-tracker__btn"
      >
        Добавить
      </Button>
      <TaskList durationPomodor={durationPomodor} />
    </div>
  );
};
