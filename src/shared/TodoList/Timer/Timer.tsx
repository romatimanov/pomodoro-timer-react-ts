import React, { useEffect, useState } from "react";
import styles from "./timer.css";
import classNames from "classnames";
import melody from "./melody.mp3";
import { useDispatch, useSelector } from "react-redux";
import { RootState, todoSlice } from "../../../store/reducer";
import { TimerHeader } from "./TimerHeader";
import { TimerTime } from "./TimerTime";
import { TimerControls } from "./TimerControls";
import { TomatoInterval } from "./TomatoFunction/TomatoInterval";
import { BreackTomatoInterval } from "./TomatoFunction/BreackTomatoInterval";
import {
  breakPause,
  continueBreak,
  continuePause,
  countStop,
  handleDone,
  handlePause,
  handleStart,
  handleStop,
} from "./TomatoFunction/ControlsFc";
import { PauseInterval } from "./TomatoFunction/PauseInterval";
import { ModalTime } from "../Modal/ModalTime";
import { ModalSettings } from "../Modal/ModalSettings";
import settings from "./settings.svg";

interface ITimerProps {
  todo: string;
  disBtn: any;
  isRun: any;
  delTodo: (index: number) => void;
  time: any;
  breakTime: any;
  longBreakTime: any;
  howBreaks: any;
}

export function Timer({
  todo,
  disBtn,
  isRun,
  delTodo,
  time,
  breakTime,
  howBreaks,
  longBreakTime
}: ITimerProps) {
  classNames(styles);
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.count);
  const pause = useSelector((state: RootState) => state.pause);
  const [pauseTime, setPauseTime] = useState(pause);
  const tasks = useSelector((state: RootState) => state.tasks);
  const [seconds, setSeconds] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [startBtn, setStartBtn] = useState("Старт");
  const [, setStartColor] = useState("timer__title");
  const [startHeaderColor, setStartHeaderColor] = useState("timer__header");
  const [stopBtn, setStopBtn] = useState("timer__stop-dis");
  const [startBreak, setStartBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(breakTime);
  const [tomatoes, setTomatoes] = useState(1);
  const [breakTomatos, setBreakTomatos] = useState(0);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const breakMinutes = Math.floor(breakSeconds / 60);
  const remainingBreakSeconds = breakSeconds % 60;
  const secondsWorked = time - minutes;
  const [key, setKey] = useState(0);
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [, setIsMelodyPlaying] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [isModalSettings, setIsModalSettings] = useState(false);
  const [longBreak, setLongBreak] = useState(false);
  const notification = useSelector((state: RootState) => state.notification);
  const [startTime, setStartTime] = useState(null);
  const handleStartPause = () => {
    dispatch(todoSlice.actions.startPause());
  };

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  useEffect(() => {
    setBreakSeconds(breakTime);
  }, [breakTime]);

  const handleEndPause = () => {
    dispatch(todoSlice.actions.endPause());
  };
  const playMelody = () => {
    const audio = new Audio(melody);
    if (notification) {
      audio.play();
      audio.onended = () => {
        setIsMelodyPlaying(false);
      };
      setIsMelodyPlaying(true);
    }
  };
  const controlsParam = {
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
    dispatch,
    setStartBreak,
    secondsWorked,
    pauseTime,
    setPauseTime,
    handleStartPause,
    handleEndPause,
    setIsTimerPlaying,
    setKey,
    setStartTime,
    startTime,
  };

  const handleTomatoComplete = (index: number) => {
    const updatedCount = [...count];
    if (updatedCount.length > 0) {
      updatedCount[0] -= 1;
      setTomatoes((prev) => prev + 1);
      setBreakTomatos((prev) => prev + 1);
      dispatch(todoSlice.actions.updateWorkedSeconds([secondsWorked]));
      setKey((prevKey: number) => prevKey + 1);
      dispatch(
        todoSlice.actions.updateTask({
          index: 0,
          count: updatedCount[0],
          task: tasks[index],
          time: time,
          breakTime: breakTime / 60,
          longBreakTime: longBreakTime / 60,
          howBreaks: howBreaks,
        })
      );
      if (tomatoes % howBreaks === 0) {
        setBreakSeconds(Math.floor(longBreakTime));
        setLongBreak(true);
      } else {
        setLongBreak(false);
      }
      if (updatedCount[0] > 0) {
        setStartBreak(true);
      } else {
        delTodo(0);
        setIsRunning(false);
        handleStop(controlsParam);
        setBreakTomatos(0);
        setTomatoes(1);
        dispatch(todoSlice.actions.updateTomato({ amount: 1 }));
        setIsTimerPlaying(false);
        playMelody();
        setIsModal(true);
        setIsWorkMode(false);
      }
    }
  };

  PauseInterval({
    isPause,
    setPauseTime,
  });

  BreackTomatoInterval({
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
  });

  TomatoInterval({
    isRunning,
    seconds,
    handleTomatoComplete,
    setSeconds,
  });

  useEffect(() => {
    setIsRunning(isRun);
    handleStop(controlsParam);
  }, [isRun]);

  return (
    <div className="timer">
      <TimerHeader
        todo={todo}
        breakTomatos={breakTomatos}
        startHeaderColor={startHeaderColor}
        startBreak={startBreak}
        tomatoes={tomatoes}
      />
      <div className="timer__content">
        <button
          className="settings__btn btn-setting"
          onClick={() => setIsModalSettings(true)}
        >
          <img src={settings} alt="settings" />
        </button>
        <TimerTime
          todo={todo}
          startBreak={startBreak}
          minutes={minutes}
          remainingSeconds={remainingSeconds}
          isTimerPlaying={isTimerPlaying}
          key={key}
          isRuning={isRunning}
          time={time}
          breakTime={breakTime}
          breakMinutes={breakMinutes}
          remainingBreakSeconds={remainingBreakSeconds}
          longBreakTime={longBreakTime}
          longBreak={longBreak}
        />
        <div className="timer__todo">
          <span className="time-todo">Задача -</span> {todo}
        </div>
        <TimerControls
          startBreak={startBreak}
          isRunning={isRunning}
          isPause={isPause}
          disBtn={disBtn}
          startBtn={startBtn}
          stopBtn={stopBtn}
          handlePause={() => handlePause(controlsParam)}
          handleStart={() => handleStart(controlsParam)}
          handleStop={() => {
            handleStop(controlsParam);
            countStop(controlsParam);
          }}
          handleDone={() => handleDone(controlsParam)}
          breakPause={() => breakPause(controlsParam)}
          continuePause={() => continuePause(controlsParam)}
          continueBreak={() => continueBreak(controlsParam)}
          delTodo={delTodo}
        />
      </div>
      {isModal && (
        <ModalTime
          text={isWorkMode ? "Перерыв окончен" : "Работа завершена"}
          onClose={() => setIsModal(false)}
        />
      )}
      {isModalSettings && (
        <ModalSettings
          onClose={() => setIsModalSettings(false)}
          time={time}
          breakTime={breakTime}
          longBreakTime={longBreakTime}
          howBreaks={howBreaks}
          notification={notification}
        />
      )}
    </div>
  );
}
