import { createContext } from "react";
import { ITask } from "../pages/PomodoroTimer";

interface ICreateContext {
  setIsOpenModal: (value: boolean) => void;
  setTaskList: (value: ITask[]) => void;
  isOpenModal: boolean;
  taskList: ITask[];
}

export const TaskTrackerContext = createContext<ICreateContext | null>(null);
