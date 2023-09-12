import { Button } from "../../../Button";

interface ITimeControlsProps {
  startBreak: boolean;
  isRunning: boolean;
  isPause: boolean;
  disBtn: any;
  startBtn: string;
  stopBtn: string;
  handlePause: () => void;
  handleStart: () => void;
  handleStop: () => void;
  handleDone: () => void;
  breakPause: () => void;
  continuePause: () => void;
  continueBreak: () => void;
  delTodo: (index: number) => void;
}

export function TimerControls({
  delTodo,
  startBreak,
  isRunning,
  disBtn,
  startBtn,
  stopBtn,
  isPause,
  handlePause,
  handleStart,
  handleStop,
  handleDone,
  breakPause,
  continueBreak,
  continuePause,
}: ITimeControlsProps) {
  return (
    <>
      {!startBreak ? (
        <div className="timer__btn-group">
          {isRunning ? (
            <Button name="Пауза" onClick={handlePause} />
          ) : (
            <button
              className="timer__start"
              disabled={!disBtn}
              onClick={handleStart}
            >
              {startBtn}
            </button>
          )}
          {!isPause ? (
            <button className={stopBtn} onClick={handleStop}>
              Стоп
            </button>
          ) : (
            <button
              className={stopBtn}
              onClick={() => {
                delTodo(0);
                handleDone();
              }}
            >
              Сделано
            </button>
          )}
        </div>
      ) : (
        <div className="timer__btn-group">
          {!isPause ? (
            <Button name="Пауза" onClick={breakPause} />
          ) : (
            <Button name="Продолжить" onClick={continuePause} />
          )}
          <button className={stopBtn} onClick={continueBreak}>
            Пропустить
          </button>
        </div>
      )}
    </>
  );
}
