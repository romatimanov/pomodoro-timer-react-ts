import { useEffect } from "react";

interface IPauseInterval {
  isPause: boolean;
  setPauseTime: any;
}

export function PauseInterval({ isPause, setPauseTime }: IPauseInterval) {
  useEffect(() => {
    if (isPause) {
      const pauseInterval = setInterval(() => {
        setPauseTime((prevSeconds: number) => Math.max(0, prevSeconds + 1));
      }, 1000);

      return () => clearInterval(pauseInterval);
    }
  }, [isPause, setPauseTime]);
}
