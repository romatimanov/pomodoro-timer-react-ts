import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface ITimerTimeProps {
  todo: string;
  startBreak: boolean;
  minutes: number;
  breakMinutes: any;
  remainingBreakSeconds: any;
  remainingSeconds: number;
  isTimerPlaying: boolean;
  isRuning: boolean;
  time: number;
  breakTime: number;
  longBreakTime: any;
  longBreak: boolean;
}

export function TimerTime({
  todo,
  startBreak,
  minutes,
  remainingSeconds,
  isTimerPlaying,
  isRuning,
  time,
  breakTime,
  breakMinutes,
  remainingBreakSeconds,
  longBreakTime,
  longBreak,
}: ITimerTimeProps) {
  const timerProps = {
    isPlaying: isTimerPlaying,
    size: 250,
    strokeWidth: 6,
  };

  return (
    <div className="timer__time">
      {todo === "" ? (
        <h1 className="timer__zero">
          <CountdownCircleTimer {...timerProps} colors="#999999" duration={0}>
            {({ color }) => (
              <div>
                <span style={{ color }}>Задач на сегодня нет</span>
              </div>
            )}
          </CountdownCircleTimer>
        </h1>
      ) : startBreak ? (
        <h2 className="timer__title">
          <CountdownCircleTimer
            {...timerProps}
            colors={["#A8B64F", "#999999"]}
            duration={longBreak ? longBreakTime : breakTime}
            colorsTime={[10, 0]}
          >
            {({ color }) => (
              <div>
                <span style={{ color }}>
                  {(breakMinutes).toString().padStart(2, "0")}
                </span>
                <span style={{ color }}>:</span>
                <span style={{ color }}>
                  {remainingBreakSeconds.toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </CountdownCircleTimer>
        </h2>
      ) : (
        <h2 className="timer__title">
          <CountdownCircleTimer
            {...timerProps}
            colors={isRuning ? ["#DC3E22", "#999999"] : ["#EF798A", "#EF798A"]}
            duration={time}
            colorsTime={[10, 0]}
          >
            {({ color }) => (
              <div>
                <span style={{ color }}>
                  {minutes.toString().padStart(2, "0")}
                </span>
                <span style={{ color }}>:</span>
                <span style={{ color }}>
                  {remainingSeconds.toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </CountdownCircleTimer>
        </h2>
      )}
    </div>
  );
}
