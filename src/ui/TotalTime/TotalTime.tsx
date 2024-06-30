import "./totalTime.css";
import { getTimeFromMins } from "../../utils/getTimeFrom";

interface IProps {
  durationPomodor: number;
  totalPomodors: number;
}

export const TotalTime = ({ durationPomodor, totalPomodors }: IProps) => {
  return (
    <p className="total-time">
      {getTimeFromMins(durationPomodor * totalPomodors)}
    </p>
  );
};
