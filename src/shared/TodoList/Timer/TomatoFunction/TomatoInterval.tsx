import { useEffect } from "react";

interface ITomatoInterval {
  isRunning: boolean;
  seconds: any;
  handleTomatoComplete: (index: number) => void;
  setSeconds: any;
}

export function TomatoInterval({
  isRunning,
  seconds,
  handleTomatoComplete,
  setSeconds,
}: ITomatoInterval) {
  useEffect(() => {
    if (isRunning && seconds > 0) {
      const tomatoInterval = setInterval(() => {
        setSeconds((prevSeconds: number) => Math.max(0, prevSeconds - 1));
      }, 1000);
      return () => clearInterval(tomatoInterval);
    } else if (isRunning && seconds === 0) {
      handleTomatoComplete(0);
    }
  }, [isRunning, seconds, setSeconds]);
}
