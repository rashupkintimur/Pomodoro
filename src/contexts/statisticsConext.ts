import { createContext } from "react";

export interface IStatisticsContext {
  setCountPomodor: (value: number) => void;
  setCountPause: (value: number) => void;
  setPauseTime: (value: number) => void;
  setWorkTimer: (value: number) => void;
  countPomodor: number;
  countPause: number;
  pauseTime: number;
  workTimer: number;
}

export const StatisticsContext = createContext<IStatisticsContext | null>(null);
