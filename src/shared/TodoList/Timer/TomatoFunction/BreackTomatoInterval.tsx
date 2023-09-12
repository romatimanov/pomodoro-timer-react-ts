import { useEffect } from "react";

interface IBreackTomatoInterval {
  startBreak: boolean;
  breakSeconds: any;
  isPause: boolean;
  setStartHeaderColor: any;
  setStartColor: any;
  setBreakSeconds: any;
  setStartBreak: any;
  setIsPause: any;
  setIsRunning: any;
  setSeconds: any;
  time: any;
  breakTime: any;
  setKey: any;
  playMelody: () => void;
  setIsModal: any;
  setIsWorkMode: any;
}

export function BreackTomatoInterval({
  startBreak,
  breakSeconds,
  isPause,
  setStartHeaderColor,
  setStartColor,
  setBreakSeconds,
  setStartBreak,
  setIsPause,
  setIsRunning,
  setSeconds,
  time,
  breakTime,
  setKey,
  playMelody,
  setIsModal,
  setIsWorkMode,
}: IBreackTomatoInterval) {
  useEffect(() => {
    if (startBreak && breakSeconds > 0 && !isPause) {
      setStartHeaderColor("timer__header-break");
      setStartColor("break__time");
      const breakInterval = setInterval(() => {
        setBreakSeconds((prevSeconds: number) => Math.max(0, prevSeconds - 1));
      }, 1000);
      return () => clearInterval(breakInterval);
    } else if (startBreak && breakSeconds === 0) {
      setStartBreak(false);
      setIsPause(false);
      setIsRunning(true);
      setSeconds(time);
      setBreakSeconds(breakTime);
      setStartColor("start__time");
      setStartHeaderColor("timer__header-start");
      setKey((prevKey: number) => prevKey + 1);
      playMelody();
      setIsModal(true);
      setIsWorkMode(true);
    }
  }, [
    breakSeconds,
    isPause,
    startBreak,
    breakTime,
    playMelody,
    setBreakSeconds,
    setIsModal,
    setIsPause,
    setIsRunning,
    setIsWorkMode,
    setKey,
    setSeconds,
    setStartBreak,
    setStartColor,
    setStartHeaderColor,
    time,
  ]);
}
