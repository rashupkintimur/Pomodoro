import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header";
import { PomodoroTimer } from "../../pages/PomodoroTimer";
import { Statistics } from "../../pages/Statistics";
import { Dispatch, SetStateAction, memo } from "react";
import { StatisticsContext } from "../../contexts/statisticsConext";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { useLocalStorageWithState } from "../../hooks/useLocalStorage";

const HeaderMemo = memo(Header);

export const Layout = () => {
  const [countPomodor, setCountPomodor] = useLocalStorageWithState(
    "countPomodor",
    "1"
  );
  const [countPause, setCountPause] = useLocalStorageWithState(
    "countPause",
    "0"
  );
  const [pauseTime, setPauseTime] = useLocalStorageWithState("pauseTime", "0");
  const [workTimer, setWorkTimer] = useLocalStorageWithState("workTimer", "0");

  const durationPomodor = 25;
  const durationShortBreak = 5;
  const durationLongBreak = 15;

  return (
    <BrowserRouter>
      <ThemeProvider>
        <StatisticsContext.Provider
          value={{
            setCountPomodor: setCountPomodor as Dispatch<
              SetStateAction<number>
            >,
            setCountPause: setCountPause as Dispatch<SetStateAction<number>>,
            setPauseTime: setPauseTime as Dispatch<SetStateAction<number>>,
            setWorkTimer: setWorkTimer as Dispatch<SetStateAction<number>>,
            countPomodor: Number(countPomodor),
            countPause: Number(countPause),
            pauseTime: Number(pauseTime),
            workTimer: Number(workTimer),
          }}
        >
          <HeaderMemo />
          <main className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <PomodoroTimer
                    durationPomodor={durationPomodor}
                    durationShortBreak={durationShortBreak}
                    durationLongBreak={durationLongBreak}
                  />
                }
              />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </main>
        </StatisticsContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
