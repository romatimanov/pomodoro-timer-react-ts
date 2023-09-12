import { todoSlice } from "../../../../store/reducer";

interface IControlsFc {
  setIsRunning: any;
  setStartColor: any;
  setStopBtn: any;
  setStartHeaderColor: any;
  setIsPause: any;
  setStartBtn: any;
  setSeconds: any;
  setBreakSeconds: any;
  time: any;
  breakTime: any;
  setStartBreak: any;
  dispatch: any;
  secondsWorked: any;
  pauseTime: any;
  setPauseTime: any;
  handleStartPause: any;
  handleEndPause: any;
  setIsTimerPlaying: any;
  setKey: any;
  startTime: any,
  setStartTime: any
}

export const handleStart = ({
  setIsRunning,
  setStartColor,
  setStopBtn,
  setStartHeaderColor,
  setIsPause,
  handleEndPause,
  setIsTimerPlaying,
  setStartTime
}: IControlsFc) => {
  setIsRunning(true);
  setStartColor("start__time");
  setStopBtn("timer__stop");
  setStartHeaderColor("timer__header-start");
  setIsPause(false);
  handleEndPause();
  setIsTimerPlaying(true);
  setStartTime(Date.now());
};

export const countStop = ({ dispatch }: IControlsFc) => {
  dispatch(todoSlice.actions.updateStopClick({ amount: 1 }));
};

export const handleStop = ({
  setIsRunning,
  setStartColor,
  setStopBtn,
  setStartHeaderColor,
  setIsPause,
  setStartBtn,
  setSeconds,
  setBreakSeconds,
  time,
  breakTime,
  setIsTimerPlaying,
  setKey,
}: IControlsFc) => {
  setIsRunning(false);
  setStartBtn("Старт");
  setStartColor("timer__title");
  setSeconds(time);
  setBreakSeconds(breakTime);
  setStopBtn("timer__stop-dis");
  setStartHeaderColor("timer__header");
  setIsPause(false);
  setIsTimerPlaying(false);
  setKey((prevKey: number) => prevKey + 1);
};

export const handlePause = ({
  setIsRunning,
  setStartColor,
  setIsPause,
  setStartBtn,
  pauseTime,
  setPauseTime,
  handleStartPause,
  setIsTimerPlaying,
}: IControlsFc) => {
  setIsRunning(false);
  setStartBtn("Продолжить");
  setStartColor("timer__title");
  setIsPause(true);
  setPauseTime(pauseTime + 1);
  handleStartPause();
  setIsTimerPlaying(false);
};

export const handleDone = ({
  setIsRunning,
  setStartColor,
  setStopBtn,
  setStartHeaderColor,
  setIsPause,
  setStartBtn,
  setSeconds,
  setBreakSeconds,
  breakTime,
  dispatch,
  handleEndPause,
  setIsTimerPlaying,
  startTime,
}: IControlsFc) => {
  setIsRunning(false);
  setStartBtn("Старт");
  setStartColor("timer__title");
  const endTime = Date.now();
  const sessionDurationInSeconds = Math.floor((endTime - startTime) / 1000);
  setSeconds(sessionDurationInSeconds);
  setBreakSeconds(breakTime);
  setStopBtn("timer__stop-dis");
  setStartHeaderColor("timer__header");
  setIsPause(false);
  dispatch(todoSlice.actions.updateTomato({ amount: 1 }));
  dispatch(todoSlice.actions.updateWorkedSeconds([sessionDurationInSeconds]));
  handleEndPause();
  setIsTimerPlaying(false);
};
export const breakPause = ({ setIsPause, setIsTimerPlaying }: IControlsFc) => {
  setIsPause(true);
  setIsTimerPlaying(false);
};
export const continuePause = ({
  setIsPause,
  setIsTimerPlaying,
}: IControlsFc) => {
  setIsPause(false);
  setIsTimerPlaying(true);
};
export const continueBreak = ({
  setIsRunning,
  setStartColor,
  setStartHeaderColor,
  setSeconds,
  setBreakSeconds,
  time,
  breakTime,
  setStartBreak,
  setIsTimerPlaying,
  setKey,
}: IControlsFc) => {
  setStartBreak(false);
  setIsRunning(true);
  setSeconds(time);
  setBreakSeconds(breakTime);
  setStartColor("start__time");
  setStartHeaderColor("timer__header-start");
  setIsTimerPlaying(true);
  setKey((prevKey: number) => prevKey + 1);
};
